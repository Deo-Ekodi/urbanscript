'use client';

import { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faInfoCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '@/app/providers/providers';


export const fetchCache = 'force-no-store';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Tool() {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numOutputs, setNumOutputs] = useState(1);
    const [seed, setSeed] = useState('');
    const [warning, setWarning] = useState('');
    const [loginWarning, setLoginWarning] = useState(false);  // For login warnings
    const [showModal, setShowModal] = useState(false);        // To control modal visibility
    const [image, setImage] = useState(null); // For local image uploads

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setLoading(true);
        setError(null);
    
        let fileUrl = null;
    
        try {
            // Check if the image is selected
            if (image) {
                const formData = new FormData();
                formData.append("content", image);
    
                // Send image to the /api/predictions/upload route
                const uploadResponse = await fetch("/api/predictions/upload", {
                    method: "POST",
                    body: formData,
                });
    
                if (!uploadResponse.ok) {
                    throw new Error("Image upload failed.");
                }
    
                const uploadResult = await uploadResponse.json();
                fileUrl = uploadResult.fileUrl; // Get the file URL from the response
            }

            console.log("done with upload, should now log url");

            console.log("File URL: " + fileUrl);
    
            // Prepare the prediction data, including the file URL if present
            const predictionData = {
                prompt: e.target.prompt.value,
                num_outputs: parseInt(numOutputs, 10),
                seed: seed || null,
                ...(fileUrl && { file: fileUrl }) // Add the file URL to the input params
            };
            // ...(fileUrl && { file: fileUrl }) // Add the file URL to the input params

            // Submit the prediction data to your backend API
            const response = await fetch("/api/predictions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(predictionData), // Send JSON data
            });
    
            let prediction = await response.json();
    
            // Handle response errors
            if (response.status !== 201) {
                setError(prediction.detail);
                setLoading(false);
                return;
            }
    
            setPrediction(prediction);
    
            // Poll for prediction status until it is either succeeded or failed
            let generatedCount = 0;
            while (prediction.status !== "succeeded" && prediction.status !== "failed") {
                await sleep(1000);
                const response = await fetch("/api/predictions/" + prediction.id);
                prediction = await response.json();
    
                if (response.status !== 200) {
                    setError(prediction.detail);
                    setLoading(false);
                    return;
                }
    
                setPrediction(prediction);
    
                // Update the count of generated outputs
                if (prediction.output && prediction.output.length > generatedCount) {
                    generatedCount = prediction.output.length;
                }
            }
    
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            setLoading(false);
            return;
        }
    
        setLoading(false);
    };


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleDownload = async (index) => {
        const imageUrl = prediction.output[index];  // Use the index to get the correct image URL
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `urban-script-output-${index + 1}.png`;  // Naming each image with its index
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h1 className="py-6 text-center font-bold text-3xl text-white">
                Reimagine your space with UrbanScript
            </h1>

            {/* Modal Popup */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            {loginWarning ? "You must be logged in" : "Insufficient Credits"}
                        </h2>
                        <p className="text-center mb-4">
                            {loginWarning
                                ? "You need to log in to generate images."
                                : warning
                            }
                        </p>
                        {loginWarning && (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
                                onClick={() => router.push('/login')}
                            >
                                Login Now
                            </button>
                        )}
                        {warning && (
                            <a
                                href="/pricing"
                                className="block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mt-2 text-center"
                            >
                                Purchase Credits
                            </a>
                        )}
                        <button
                            onClick={() => setShowModal(false)}
                            className="block mt-4 text-red-500 text-center underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Form Section */}
            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Input Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                        <div className="flex items-center gap-4 relative">
                            <div className="flex-1">
                                <label className="block text-white mb-1">
                                    {/* Number of Outputs (1-4): */}
                                    Number of Outputs (1-4):
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        max="4"
                                        value={numOutputs}
                                        onChange={(e) => setNumOutputs(e.target.value)}
                                        className="p-2 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                        placeholder="1"
                                    />
                                    <div className="relative group ml-2">
                                        <FontAwesomeIcon
                                            icon={faInfoCircle}
                                            className="text-green-500 hover:text-green-300 cursor-pointer"
                                        />
                                        <div className="absolute hidden group-hover:block bg-gray-800 text-white p-2 rounded-lg shadow-lg top-6 left-0 w-48">
                                            Specify how many images you'd like to generate. The maximum is 4.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-white mb-1">Seed (Optional):</label>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        value={seed}
                                        onChange={(e) => setSeed(e.target.value)}
                                        className="p-2 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                        placeholder="2024"
                                    />
                                    <div className="relative group ml-2">
                                        <FontAwesomeIcon
                                            icon={faInfoCircle}
                                            className="text-green-500 hover:text-green-300 cursor-pointer"
                                        />
                                        <div className="absolute hidden group-hover:block bg-gray-800 text-white p-2 rounded-lg shadow-lg top-6 left-0 w-48">
                                            Optional: Use a seed for deterministic outputs (i.e., generate the same image each time).
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="flex items-center gap-4">
                    <label className="block text-white mb-1">
                        Upload an Image (Optional):
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="upload"
                    />
                    <label htmlFor="upload" className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition">
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Upload Image
                    </label>
                </div>

                {/* Display Uploaded Image */}
                {image && (
                    <div className="mt-4">
                        <p className="text-white">Selected Image: {image.name}</p>
                    </div>
                )}

                {/* Submit Section */}
                <div className="flex flex-col lg:flex-row lg:items-end gap-4 w-full mt-4">
                    <input
                        type="text"
                        className="flex-grow p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        name="prompt"
                        placeholder="Enter a prompt to generate"
                    />
                    <div className="relative group ml-2">
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            className="text-green-500 hover:text-green-300 cursor-pointer"
                        />
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white p-2 rounded-lg shadow-lg top-6 left-0 w-48">
                            <p>~ Visit "Prompt Generator" to get optimal prompts ~.</p>
                            <p>Download and own images once generated. For image storage options, please contact us.</p>
                        </div>
                    </div>
                    <button className="button w-full lg:w-auto" type="submit">
                        Generate
                    </button>
                </div>


                {loading && (
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                        <p>Processing...</p>
                    </div>
                )}

                {prediction && prediction.output && (
                    <div className="image-gallery grid gap-4 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {prediction.output.map((url, index) => (
                            <div key={index} className="relative image-item">
                                <Image
                                    src={url}
                                    alt={`Output ${index + 1}`}
                                    sizes="100vw"
                                    height={prediction.output.length === 1 ? 1024 : 512}
                                    width={prediction.output.length === 1 ? 1024 : 512}
                                    className="rounded-lg shadow-lg"
                                />
                                <button
                                    type="button" // Add this to prevent form submission
                                    onClick={() => handleDownload(index)}
                                    className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow hover:bg-blue-700 transition"
                                    aria-label={`Download image ${index + 1}`}
                                >
                                    <FontAwesomeIcon icon={faDownload} size="lg" />
                                </button>

                            </div>
                        ))}
                    </div>
                )}

                {prediction && (
                    <p className="py-3 text-sm opacity-50 text-gray-300">
                        status: {prediction.status}
                    </p>
                )}

            <style jsx>{`
                .group:hover .group-hover\\:block {
                    display: block;
                }
                .container {
                    background: linear-gradient(to bottom right, #1f1c2c, #928dab);
                    border-radius: 15px;
                    padding: 2rem;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }
                .button {
                    background: #38a169;
                    color: white;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .button:hover {
                    background: #2f855a;
                }
                .group:hover .tooltip {
                    display: block;
                }

                .loader-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 2rem 0;
                }
                .loader {
                    border: 8px solid rgba(255, 255, 255, 0.3);
                    border-top: 8px solid #fff;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                .image-gallery {
                    display: grid;
                    gap: 1rem;
                }
                .image-item {
                    position: relative;
                    overflow: hidden;
                }
                .custom-ordered-list {
                    list-style: none; /* Remove default list styling */
                    padding: 0; /* Remove padding */
                    counter-reset: item; /* Reset counter */
                }

                .custom-ordered-list li {
                    position: relative; /* Position relative for absolute positioning of the number */
                    padding-left: 30px; /* Space for the circle */
                    margin-bottom: 10px; /* Space between list items */
                }

                .custom-ordered-list li::before {
                    content: counter(item); /* Remove the dot */
                    counter-increment: item; /* Increment the counter */
                    position: absolute; /* Position absolutely */
                    left: 0; /* Align to the left */
                    top: 0; /* Align to the top */
                    width: 20px; /* Width of the circle */
                    height: 20px; /* Height of the circle */
                    background-color: grey; /* Circle color */
                    border-radius: 50%; /* Make it circular */
                    display: flex; /* Flexbox for centering text */
                    align-items: center; /* Center vertically */
                    justify-content: center; /* Center horizontally */
                    color: white; /* Text color */
                    font-weight: bold; /* Bold text */
                }

            `}</style>
            </form>
        </div>
    );
}

