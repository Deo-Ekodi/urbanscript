// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';

// export const fetchCache = 'force-no-store';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// export default function Home() {
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     const response = await fetch("/api/predictions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: e.target.prompt.value,
//       }),
//     });
//     let prediction = await response.json();
//     if (response.status !== 201) {
//       setError(prediction.detail);
//       setLoading(false);
//       return;
//     }
//     setPrediction(prediction);

//     while (
//       prediction.status !== "succeeded" &&
//       prediction.status !== "failed"
//     ) {
//       await sleep(1000);
//       const response = await fetch("/api/predictions/" + prediction.id);
//       prediction = await response.json();
//       if (response.status !== 200) {
//         setError(prediction.detail);
//         setLoading(false);
//         return;
//       }
//       setPrediction(prediction);
//     }

//     setLoading(false);
//   };


//   const handleDownload = async () => {
//     const imageUrl = prediction.output[prediction.output.length - 1];
    
//     // Fetch the image and convert it to a Blob
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
  
//     // Create a link element and trigger the download
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'urban-script.png'; // Set a default file name
//     document.body.appendChild(link);
//     link.click();
    
//     // Clean up
//     document.body.removeChild(link);
//     URL.revokeObjectURL(link.href); // Free up memory
//   };
  

//   return (
//     <div className="container max-w-2xl mx-auto p-5">
//       <h1 className="py-6 text-center font-bold text-2xl">
//         Dream something with UrbanScript
//       </h1>

//       <form className="w-full flex" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="flex-grow"
//           name="prompt"
//           placeholder="Enter a prompt to generate"
//         />
//         <button className="button" type="submit">
//           Go!
//         </button>
//       </form>

//       {error && <div>{error}</div>}
      
//       {loading && (
//         <div className="loader-wrapper">
//           <div className="loader"></div>
//           <p>Processing...</p>
//         </div>
//       )}

//       {prediction && prediction.output && (
//         <div className="image-wrapper mt-5 relative">
//           <Image
//             src={prediction.output[prediction.output.length - 1]}
//             alt="output"
//             sizes="100vw"
//             height={768}
//             width={768}
//           />
//           <button
//             onClick={handleDownload}
//             className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow hover:bg-blue-700 transition"
//             aria-label="Download image"
//           >
//             <FontAwesomeIcon icon={faDownload} size="lg" />
//           </button>
//         </div>
//       )}
      
//       {prediction && (
//         <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
//       )}
//     </div>
//   );
// }

'use client';

import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPaperclip } from '@fortawesome/free-solid-svg-icons';

export const fetchCache = 'force-no-store';

const Home = () => {
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true); // Start loading

        const formData = new FormData(event.target); // Create a new FormData object directly from the form
        const prompt = formData.get("prompt"); // Get the prompt from FormData
        const imageFile = formData.get("file"); // Get the uploaded file
//unnecesary
        console.log("FormData:", Array.from(formData.entries())); // Log FormData entries


        if (!imageFile) {
            console.error("No file uploaded");
            setError("Please upload a file.");
            setLoading(false);
            return;
        }

        // Step 1: Upload the image file
        const fileUploadResponse = await fetch("/api/upload_file", {
            method: "POST",
            body: formData
        });

        if (!fileUploadResponse.ok) {
            console.error("Failed to upload image");
        
            // Check if there is a response body
            const responseText = await fileUploadResponse.text(); // Get response as text
            console.log("Response from server:", responseText);
        
            try {
                const errorMessage = JSON.parse(responseText); // Attempt to parse the response as JSON
                setError(errorMessage.detail || "Failed to upload image.");
            } catch (jsonError) {
                setError("Failed to upload image. Server response was not valid JSON.");
            }
        
            setLoading(false);
            return;
        }

        const { fileUrl } = await fileUploadResponse.json();

        // Step 2: Send the prompt and image URL to predictions
        const modelInput = {
            prompt: prompt,
            image: fileUrl, // Use the uploaded file URL
        };

        const predictionResponse = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(modelInput),
        });

        if (!predictionResponse.ok) {
            console.error("Error in prediction:", predictionResponse);
            const predictionError = await predictionResponse.json();
            setError(predictionError.detail || "Error in prediction.");
            setLoading(false);
            return;
        }

        const predictionResult = await predictionResponse.json();
        setPrediction(predictionResult);
        setLoading(false); // Stop loading
    };

    const handleDownload = async () => {
        const imageUrl = prediction.output[prediction.output.length - 1];
        const response = await fetch(imageUrl);
        const blob = await response.blob();
    
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'urban-script.png';
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    return (
        <div className="container max-w-2xl mx-auto p-5">
            <h1 className="py-6 text-center font-bold text-2xl">
                Dream something with UrbanScript
            </h1>

            <form className="w-full flex" onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    className="flex-grow"
                    name="prompt"
                    placeholder="Enter a prompt to generate"
                    required // Added required attribute
                />
                <label htmlFor="file-upload" className="file-upload-label">
                    <FontAwesomeIcon icon={faPaperclip} size="lg" />
                </label>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    name="file" // Ensure name is set for FormData
                    required // Added required attribute
                />
                <button className="button" type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Go!"} {/* Dynamic button text */}
                </button>
            </form>

            {error && <div className="text-red-500">{error}</div>}
            
            {loading && (
                <div className="loader-wrapper">
                    <div className="loader"></div>
                    <p>Processing...</p>
                </div>
            )}

            {prediction && prediction.output && (
                <div className="image-wrapper mt-5 relative">
                    <Image
                        src={prediction.output[prediction.output.length - 1]}
                        alt="output"
                        sizes="100vw"
                        height={768}
                        width={768}
                    />
                    <button
                        onClick={handleDownload}
                        className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow hover:bg-blue-700 transition"
                        aria-label="Download image"
                    >
                        <FontAwesomeIcon icon={faDownload} size="lg" />
                    </button>
                </div>
            )}
            
            {prediction && (
                <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
            )}
        </div>
    );
};

export default Home;
