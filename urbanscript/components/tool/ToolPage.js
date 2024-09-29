// 'use client';

// import { useState } from "react";
// import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';
// // import "../globals.css";

// export const fetchCache = 'force-no-store';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// export default function Tool() {
//     const [prediction, setPrediction] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         const response = await fetch("/api/predictions", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 prompt: e.target.prompt.value,
//             }),
//         });
//         let prediction = await response.json();
//         if (response.status !== 201) {
//             setError(prediction.detail);
//             setLoading(false);
//             return;
//         }
//         setPrediction(prediction);

//         while (
//             prediction.status !== "succeeded" &&
//             prediction.status !== "failed"
//         ) {
//             await sleep(1000);
//             const response = await fetch("/api/predictions/" + prediction.id);
//             prediction = await response.json();
//             if (response.status !== 200) {
//                 setError(prediction.detail);
//                 setLoading(false);
//                 return;
//             }
//             setPrediction(prediction);
//         }

//         setLoading(false);
//     };

//     const handleDownload = async () => {
//         const imageUrl = prediction.output[prediction.output.length - 1];

//         // Fetch the image and convert it to a Blob
//         const response = await fetch(imageUrl);
//         const blob = await response.blob();

//         // Create a link element and trigger the download
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'urban-script.png'; // Set a default file name
//         document.body.appendChild(link);
//         link.click();

//         // Clean up
//         document.body.removeChild(link);
//         URL.revokeObjectURL(link.href); // Free up memory
//     };

//     return (
//         <div className="container max-w-2xl mx-auto p-5">
//             <h1 className="py-6 text-center font-bold text-2xl text-white">
//                 Generate Images with UrbanScript
//             </h1>

//             <form className="w-full flex" onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     className="flex-grow p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                     name="prompt"
//                     placeholder="Enter a prompt to generate"
//                 />
//                 <button className="button" type="submit">
//                     Generate
//                 </button>
//             </form>

//             {error && <div className="text-red-500 py-2">{error}</div>}

//             {loading && (
//                 <div className="loader-wrapper">
//                     <div className="loader"></div>
//                     <p>Processing...</p>
//                 </div>
//             )}

//             {prediction && prediction.output && (
//                 <div className="image-wrapper mt-5 relative">
//                     <Image
//                         src={prediction.output[prediction.output.length - 1]}
//                         alt="output"
//                         sizes="100vw"
//                         height={768}
//                         width={768}
//                         className="rounded-lg shadow-lg"
//                     />
//                     <button
//                         onClick={handleDownload}
//                         className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow hover:bg-blue-700 transition"
//                         aria-label="Download image"
//                     >
//                         <FontAwesomeIcon icon={faDownload} size="lg" />
//                     </button>
//                 </div>
//             )}

//             {prediction && (
//                 <p className="py-3 text-sm opacity-50 text-gray-300">
//                     status: {prediction.status}
//                 </p>
//             )}

//             {/* Scoped CSS */}
//             <style jsx>{`
//                 .container {
//                     background: linear-gradient(to bottom right, #1f1c2c, #928dab);
//                     border-radius: 15px;
//                     padding: 2rem;
//                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
//                 }
//                 .button {
//                     background: #38a169; /* Green */
//                     color: white;
//                     padding: 1rem 2rem;
//                     border: none;
//                     border-radius: 8px;
//                     font-weight: bold;
//                     cursor: pointer;
//                     margin-left: 1rem;
//                     transition: background 0.3s;
//                 }
//                 .button:hover {
//                     background: #2f855a; /* Darker green */
//                 }
//                 .loader-wrapper {
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     flex-direction: column;
//                     padding: 2rem 0;
//                 }
//                 .loader {
//                     border: 8px solid rgba(255, 255, 255, 0.3);
//                     border-top: 8px solid #fff;
//                     border-radius: 50%;
//                     width: 40px;
//                     height: 40px;
//                     animation: spin 1s linear infinite;
//                 }
//                 @keyframes spin {
//                     0% {
//                         transform: rotate(0deg);
//                     }
//                     100% {
//                         transform: rotate(360deg);
//                     }
//                 }
//                 .image-wrapper {
//                     position: relative;
//                     overflow: hidden;
//                 }
//             `}</style>
//         </div>
//     );
// }

'use client';

import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '@/app/providers/providers'; // Adjust the import path if necessary

export const fetchCache = 'force-no-store';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Tool() {
    const { user } = useContext(AuthContext); // Get the user from the context
    const router = useRouter(); // Use router for redirection

    // Check if the user is authenticated
    useEffect(() => {
        if (!user) {
            router.push('/login'); // Redirect to the login page if not authenticated
        }
    }, [user, router]);

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: e.target.prompt.value,
            }),
        });
        let prediction = await response.json();
        if (response.status !== 201) {
            setError(prediction.detail);
            setLoading(false);
            return;
        }
        setPrediction(prediction);

        while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
        ) {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            if (response.status !== 200) {
                setError(prediction.detail);
                setLoading(false);
                return;
            }
            setPrediction(prediction);
        }

        setLoading(false);
    };

    const handleDownload = async () => {
        const imageUrl = prediction.output[prediction.output.length - 1];

        // Fetch the image and convert it to a Blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'urban-script.png'; // Set a default file name
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href); // Free up memory
    };

    if (!user) {
        return null; // Optionally render a loading state or nothing until authentication is confirmed
    }

    return (
        <div className="container max-w-2xl mx-auto p-5">
            <h1 className="py-6 text-center font-bold text-2xl text-white">
                Generate Images with UrbanScript
            </h1>

            <form className="w-full flex" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="flex-grow p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    name="prompt"
                    placeholder="Enter a prompt to generate"
                />
                <button className="button" type="submit">
                    Generate
                </button>
            </form>

            {error && <div className="text-red-500 py-2">{error}</div>}

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
                        className="rounded-lg shadow-lg"
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
                <p className="py-3 text-sm opacity-50 text-gray-300">
                    status: {prediction.status}
                </p>
            )}

            {/* Scoped CSS */}
            <style jsx>{`
                .container {
                    background: linear-gradient(to bottom right, #1f1c2c, #928dab);
                    border-radius: 15px;
                    padding: 2rem;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }
                .button {
                    background: #38a169; /* Green */
                    color: white;
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-left: 1rem;
                    transition: background 0.3s;
                }
                .button:hover {
                    background: #2f855a; /* Darker green */
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
                .image-wrapper {
                    position: relative;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
