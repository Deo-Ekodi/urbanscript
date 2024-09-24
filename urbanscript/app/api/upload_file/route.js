import formidable from 'formidable';
import fetch from 'node-fetch';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser
  },
};

export async function POST(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        reject(new Response(JSON.stringify({ error: "Failed to process form" }), { status: 500 }));
        return;
      }

      const file = files.file; // Access the uploaded image
      if (!file) {
        resolve(new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 }));
        return;
      }

      try {
        // Read the uploaded file
        const fileBuffer = await fs.readFile(file.filepath);

        // Create FormData for the file upload
        const formData = new FormData();
        formData.append("content", fileBuffer, { filename: file.originalFilename });
        formData.append("title", file.originalFilename); // Title for the file

        // Upload file to Replicate
        const fileUploadResponse = await fetch("https://api.replicate.com/v1/files", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
            // Note: Content-Type will be set automatically by FormData
          },
          body: formData, // Use FormData as the body
        });

        if (!fileUploadResponse.ok) {
            const errorDetails = await fileUploadResponse.text(); // Get response as text
            console.error("Failed to upload file to Replicate:", errorDetails);
            throw new Error("Failed to upload file to Replicate");
        }

        const fileData = await fileUploadResponse.json();
        const fileInputUrl = fileData.urls.get; // Get the URL from the response

        resolve(new Response(JSON.stringify({ fileUrl: fileInputUrl }), { status: 200 }));
      } catch (error) {
        console.error("File upload error:", error);
        reject(new Response(JSON.stringify({ error: "Failed to upload file" }), { status: 500 }));
      }
    });
  });
}
