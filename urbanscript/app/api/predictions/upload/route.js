import { NextResponse } from 'next/server';

export const fetchCache = 'force-no-store';

export async function POST(request) {
  try {
    // Parse the request's FormData, expecting the 'content' field to be the image file
    const formData = await request.formData();
    const image = formData.get('content'); // Get the uploaded file from formData

    if (!image) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Prepare FormData for the request to Replicate API
    const replicateFormData = new FormData();
    replicateFormData.append('content', image, {
      type: 'application/octet-stream', // Set file type to 'application/octet-stream' as per documentation
      title: image.name, // Optional: title is set to the file's name
    });

    // Upload the image to Replicate's file upload API
    const uploadResponse = await fetch("https://api.replicate.com/v1/files", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      },
      body: replicateFormData,
    });

    // Check if the upload was successful
    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text(); // Capture detailed error message
      throw new Error(`Replicate upload failed: ${errorText}`);
    }

    // console.log("image upload SUCCESS!");

    // Parse the JSON response to get the file URL
    const uploadResult = await uploadResponse.json();
    const fileUrl = uploadResult.urls.get; // Extract the public URL of the uploaded file

    // Return the file URL in the response
    return NextResponse.json({ fileUrl }, { status: 201 });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
