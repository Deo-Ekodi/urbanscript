// // 'use client';

// // import { useState, useEffect, useContext } from "react";
// // import { useRouter } from 'next/navigation';
// // import Image from "next/image";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faDownload } from '@fortawesome/free-solid-svg-icons';
// // import { AuthContext } from '@/app/providers/providers';

// // export const fetchCache = 'force-no-store';

// // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// // export default function Tool() {
// //     const { user } = useContext(AuthContext);
// //     const router = useRouter();

// //     useEffect(() => {
// //         if (!user) {
// //             router.push('/login');
// //         }
// //     }, [user, router]);

// //     const [prediction, setPrediction] = useState(null);
// //     const [error, setError] = useState(null);
// //     const [loading, setLoading] = useState(false);
// //     const [numOutputs, setNumOutputs] = useState(1);
// //     const [seed, setSeed] = useState('');
// //     const [warning, setWarning] = useState('');

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError(null);

// //         // Fetch user's credits from the database
// //         const creditsResponse = await fetch("/api/check-credits", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ email: user.email }), // Send user's email to check credits
// //         });

// //         const { credits } = await creditsResponse.json();

// //         // Check user credits
// //         if (credits < numOutputs) {
// //             setWarning(`You do not have enough credits to generate ${numOutputs} image(s). Please purchase more credits.`);
// //             setLoading(false);
// //             return;
// //         }
    
// //         const response = await fetch("/api/predictions", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({
// //                 prompt: e.target.prompt.value,
// //                 num_outputs: parseInt(numOutputs, 10),
// //                 seed: seed || null,
// //             }),
// //         });
    
// //         let prediction = await response.json();
// //         if (response.status !== 201) {
// //             setError(prediction.detail);
// //             setLoading(false);
// //             return;
// //         }
        
// //         setPrediction(prediction);
    
// //         let generatedCount = 0; // Variable to count the number of images generated
// //         while (
// //             prediction.status !== "succeeded" &&
// //             prediction.status !== "failed"
// //         ) {
// //             await sleep(1000);
// //             const response = await fetch("/api/predictions/" + prediction.id);
// //             prediction = await response.json();
// //             if (response.status !== 200) {
// //                 setError(prediction.detail);
// //                 setLoading(false);
// //                 return;
// //             }
// //             setPrediction(prediction);
            
// //             // Check if images were generated in this status update
// //             if (prediction.output && prediction.output.length > generatedCount) {
// //                 generatedCount = prediction.output.length; // Update the count
// //             }
// //         }
    
// //         // Deduct credits based on the number of images generated
// //         if (generatedCount > 0) {
// //             await fetch("/api/deduct-credits", {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                     email: user.email,
// //                     creditsToDeduct: generatedCount,
// //                 }),
// //             });
// //         }
    
// //         setLoading(false);
// //     };
    
// //     const handleDownload = async () => {
// //         const imageUrl = prediction.output[prediction.output.length - 1];
// //         const response = await fetch(imageUrl);
// //         const blob = await response.blob();

// //         const link = document.createElement('a');
// //         link.href = URL.createObjectURL(blob);
// //         link.download = 'urban-script.png';
// //         document.body.appendChild(link);
// //         link.click();

// //         document.body.removeChild(link);
// //         URL.revokeObjectURL(link.href);
// //     };

// //     if (!user) {
// //         return null;
// //     }

// //     return (
// //         <div className="container mx-auto px-4 sm:px-8 py-8">
// //             <h1 className="py-6 text-center font-bold text-3xl text-white">
// //                 Generate Images with UrbanScript
// //             </h1>

// //             {/* Input Form Section */}
// //             <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
// //                 {/* Input and Guidance Section */}
// //                 <div className="flex flex-col lg:flex-row gap-8">
// //                     {/* Left Section: Input Fields */}
// //                     <div className="flex flex-col gap-4 w-full lg:w-1/2">
// //                         <div className="flex items-center gap-4">
// //                             <div className="flex-1">
// //                                 <label className="block text-white mb-1">
// //                                     Number of Outputs (1-4):
// //                                 </label>
// //                                 <input
// //                                     type="number"
// //                                     min="1"
// //                                     max="4"
// //                                     value={numOutputs}
// //                                     onChange={(e) => setNumOutputs(e.target.value)}
// //                                     className="p-2 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
// //                                     placeholder="1"
// //                                 />
// //                             </div>
// //                             <div className="flex-1">
// //                                 <label className="block text-white mb-1">
// //                                     Seed (Optional):
// //                                 </label>
// //                                 <input
// //                                     type="number"
// //                                     value={seed}
// //                                     onChange={(e) => setSeed(e.target.value)}
// //                                     className="p-2 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
// //                                     placeholder="2024"
// //                                 />
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Right Section: Guidance */}
// //                     <div className="flex-1 bg-white rounded-lg p-4 shadow-md">
// //                         <h3 className="font-bold mb-2">Guidance</h3>
// //                         <p className="text-gray-700">
// //                             Use the <b>Number of Outputs</b> field to specify how many images you want to generate (1-4).
// //                             The <b>Seed</b> field is optional. If you enter a seed value, the generation will be consistent and reproducible, which is helpful if you want the same output every time.
// //                         </p>
// //                     </div>
// //                 </div>

// //                 {/* Existing Prompt Input and Button Section */}
// //                 <div className="flex flex-col lg:flex-row lg:items-end gap-4 w-full mt-4">
// //                     <input
// //                         type="text"
// //                         className="flex-grow p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
// //                         name="prompt"
// //                         placeholder="Enter a prompt to generate"
// //                     />
// //                     <button className="button w-full lg:w-auto" type="submit">
// //                         Generate
// //                     </button>
// //                 </div>

// //                 {warning && (
// //                     <div className="text-yellow-500 py-2">
// //                         {warning}
// //                         <br />
// //                         <a href="/pricing" className="text-blue-500 underline">Go to Pricing</a>
// //                     </div>
// //                 )}
// //             </form>

// //             {error && <div className="text-red-500 py-2">{error}</div>}

// //             {loading && (
// //                 <div className="loader-wrapper">
// //                     <div className="loader"></div>
// //                     <p>Processing...</p>
// //                 </div>
// //             )}

// //             {prediction && prediction.output && (
// //                 <div className="image-gallery grid gap-4 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
// //                     {prediction.output.map((url, index) => (
// //                         <div key={index} className="relative image-item">
// //                             <Image
// //                                 src={url}
// //                                 alt={`Output ${index + 1}`}
// //                                 sizes="100vw"
// //                                 height={prediction.output.length === 1 ? 768 : 384}
// //                                 width={prediction.output.length === 1 ? 768 : 384}
// //                                 className="rounded-lg shadow-lg"
// //                             />
// //                             <button
// //                                 onClick={() => handleDownload(index)}
// //                                 className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow hover:bg-blue-700 transition"
// //                                 aria-label={`Download image ${index + 1}`}
// //                             >
// //                                 <FontAwesomeIcon icon={faDownload} size="lg" />
// //                             </button>
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}

// //             {prediction && (
// //                 <p className="py-3 text-sm opacity-50 text-gray-300">
// //                     status: {prediction.status}
// //                 </p>
// //             )}

// //             <style jsx>{`
// //                 .container {
// //                     background: linear-gradient(to bottom right, #1f1c2c, #928dab);
// //                     border-radius: 15px;
// //                     padding: 2rem;
// //                     box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
// //                 }
// //                 .button {
// //                     background: #38a169;
// //                     color: white;
// //                     padding: 1rem 2rem;
// //                     border: none;
// //                     border-radius: 8px;
// //                     font-weight: bold;
// //                     cursor: pointer;
// //                     transition: background 0.3s;
// //                 }
// //                 .button:hover {
// //                     background: #2f855a;
// //                 }
// //                 .loader-wrapper {
// //                     display: flex;
// //                     align-items: center;
// //                     justify-content: center;
// //                     flex-direction: column;
// //                     padding: 2rem 0;
// //                 }
// //                 .loader {
// //                     border: 8px solid rgba(255, 255, 255, 0.3);
// //                     border-top: 8px solid #fff;
// //                     border-radius: 50%;
// //                     width: 40px;
// //                     height: 40px;
// //                     animation: spin 1s linear infinite;
// //                 }
// //                 @keyframes spin {
// //                     0% {
// //                         transform: rotate(0deg);
// //                     }
// //                     100% {
// //                         transform: rotate(360deg);
// //                     }
// //                 }
// //                 .image-gallery {
// //                     display: grid;
// //                     gap: 1rem;
// //                 }
// //                 .image-item {
// //                     position: relative;
// //                     overflow: hidden;
// //                 }
// //             `}</style>
// //         </div>
// //     );
// // }


// 'use client';

// import { useState, useEffect, useContext } from "react";
// import { useRouter } from 'next/navigation';
// import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import { AuthContext } from '@/app/providers/providers';

// export const fetchCache = 'force-no-store';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// export default function Tool() {
//     const { user } = useContext(AuthContext);
//     const router = useRouter();

//     useEffect(() => {
//         if (!user) {
//             router.push('/login');
//         }
//     }, [user, router]);

//     const [prediction, setPrediction] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [numOutputs, setNumOutputs] = useState(1);
//     const [seed, setSeed] = useState('');
//     const [warning, setWarning] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         // Fetch user's credits from the database
//         const creditsResponse = await fetch("/api/check-credits", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: user.email }), // Send user's email to check credits
//         });

//         const { credits } = await creditsResponse.json();

//         // Check user credits
//         if (credits < numOutputs) {
//             setWarning(`You do not have enough credits to generate ${numOutputs} image(s). Please purchase more credits.`);
//             setLoading(false);
//             return;
//         }

//         const response = await fetch("/api/predictions", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 prompt: e.target.prompt.value,
//                 num_outputs: parseInt(numOutputs, 10),
//                 seed: seed || null,
//             }),
//         });

//         let prediction = await response.json();
//         if (response.status !== 201) {
//             setError(prediction.detail);
//             setLoading(false);
//             return;
//         }

//         setPrediction(prediction);

//         let generatedCount = 0; // Variable to count the number of images generated
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

//             // Check if images were generated in this status update
//             if (prediction.output && prediction.output.length > generatedCount) {
//                 generatedCount = prediction.output.length; // Update the count
//             }
//         }

//         // Deduct credits based on the number of images generated
//         if (generatedCount > 0) {
//             await fetch("/api/deduct-credits", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     email: user.email,
//                     creditsToDeduct: generatedCount,
//                 }),
//             });
//         }

//         setLoading(false);
//     };

//     const handleDownload = async () => {
//         const imageUrl = prediction.output[prediction.output.length - 1];
//         const response = await fetch(imageUrl);
//         const blob = await response.blob();

//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'urban-script.png';
//         document.body.appendChild(link);
//         link.click();

//         document.body.removeChild(link);
//         URL.revokeObjectURL(link.href);
//     };

//     if (!user) {
//         return null;
//     }

//     return (
//         <div className="container mx-auto px-4 sm:px-8 py-8">
//             <h1 className="py-6 text-center font-bold text-3xl text-white">
//                 Generate Images with UrbanScript
//             </h1>

//             {/* Input Form Section */}
//             <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
//                 {/* Input and Guidance Section */}
//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Left Section: Input Fields */}
//                     <div className="flex flex-col gap-4 w-full lg:w-1/2">
//                         <div className="flex items-center gap-4">
//                             <div className="flex-1">
//                                 <label className="block text-white mb-1">
//                                     Number of Outputs (1-4):
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     max="4"
//                                     value={numOutputs}
//                                     onChange={(e) => setNumOutputs(e.target.value)}
//                                     className="p-2 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                                     placeholder="1"
//                                 />
//                             </div>
//                             <div className="flex-1">
//                                 <label className="block text-white mb-1">
//                                     Seed (Optional):
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={seed}
//                                     onChange={(e) => setSeed(e.target.value)}
//                                     className="p-2 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                                     placeholder="2024"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Section: Guidance */}
//                     <div className="flex-1 bg-white rounded-lg p-4 shadow-md">
//                         <h3 className="font-bold mb-2">Onboarding Steps</h3>
//                         <ol className="list-decimal list-inside text-gray-700 custom-ordered-list">
//                             <li> (MUST)Refresh this page to get up-to-date <b>Credits</b>.</li>
//                             <li>Select the number of outputs (1-4) you want to generate.</li>
//                             <li>Optionally, enter a seed value for consistent results across generations.</li>
//                             {/* <li>Enter your prompt in the input field to describe the image you want to generate.</li> */}
//                             <li>Click <b>Generate</b> button to start the image generation process.</li>
//                             <li>Download and Own your images. (we do not store your images at the moment)</li>
//                         </ol>
//                     </div>
//                 </div>

//                 {/* Existing Prompt Input and Button Section */}
//                 <div className="flex flex-col lg:flex-row lg:items-end gap-4 w-full mt-4">
//                     <input
//                         type="text"
//                         className="flex-grow p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                         name="prompt"
//                         placeholder="Enter a prompt to generate"
//                     />
//                     <button className="button w-full lg:w-auto" type="submit">
//                         Generate
//                     </button>
//                 </div>

//                 {warning && (
//                     <div className="text-yellow-500 py-2">
//                         {warning}
//                         <br />
//                         <a href="/pricing" className="text-blue-500 underline">Go to Pricing</a>
//                     </div>
//                 )}
//             </form>

//             {error && <div className="text-red-500 py-2">{error}</div>}

//             {loading && (
//                 <div className="loader-wrapper">
//                     <div className="loader"></div>
//                     <p>Processing...</p>
//                 </div>
//             )}

//             {prediction && prediction.output && (
//                 <div className="image-gallery grid gap-4 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                     {prediction.output.map((url, index) => (
//                         <div key={index} className="relative image-item">
//                             <Image
//                                 src={url}
//                                 alt={`Output ${index + 1}`}
//                                 sizes="100vw"
//                                 height={prediction.output.length === 1 ? 768 : 384}
//                                 width={prediction.output.length === 1 ? 768 : 384}
//                                 className="rounded-lg shadow-lg"
//                             />
//                             <button
//                                 onClick={() => handleDownload(index)}
//                                 className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow hover:bg-blue-700 transition"
//                                 aria-label={`Download image ${index + 1}`}
//                             >
//                                 <FontAwesomeIcon icon={faDownload} size="lg" />
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {prediction && (
//                 <p className="py-3 text-sm opacity-50 text-gray-300">
//                     status: {prediction.status}
//                 </p>
//             )}

            // <style jsx>{`
            //     .container {
            //         background: linear-gradient(to bottom right, #1f1c2c, #928dab);
            //         border-radius: 15px;
            //         padding: 2rem;
            //         box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            //     }
            //     .button {
            //         background: #38a169;
            //         color: white;
            //         padding: 1rem 2rem;
            //         border: none;
            //         border-radius: 8px;
            //         font-weight: bold;
            //         cursor: pointer;
            //         transition: background 0.3s;
            //     }
            //     .button:hover {
            //         background: #2f855a;
            //     }
            //     .loader-wrapper {
            //         display: flex;
            //         align-items: center;
            //         justify-content: center;
            //         flex-direction: column;
            //         padding: 2rem 0;
            //     }
            //     .loader {
            //         border: 8px solid rgba(255, 255, 255, 0.3);
            //         border-top: 8px solid #fff;
            //         border-radius: 50%;
            //         width: 40px;
            //         height: 40px;
            //         animation: spin 1s linear infinite;
            //     }
            //     @keyframes spin {
            //         0% {
            //             transform: rotate(0deg);
            //         }
            //         100% {
            //             transform: rotate(360deg);
            //         }
            //     }
            //     .image-gallery {
            //         display: grid;
            //         gap: 1rem;
            //     }
            //     .image-item {
            //         position: relative;
            //         overflow: hidden;
            //     }
            //     .custom-ordered-list {
            //         list-style: none; /* Remove default list styling */
            //         padding: 0; /* Remove padding */
            //         counter-reset: item; /* Reset counter */
            //     }

            //     .custom-ordered-list li {
            //         position: relative; /* Position relative for absolute positioning of the number */
            //         padding-left: 30px; /* Space for the circle */
            //         margin-bottom: 10px; /* Space between list items */
            //     }

            //     .custom-ordered-list li::before {
            //         content: counter(item); /* Remove the dot */
            //         counter-increment: item; /* Increment the counter */
            //         position: absolute; /* Position absolutely */
            //         left: 0; /* Align to the left */
            //         top: 0; /* Align to the top */
            //         width: 20px; /* Width of the circle */
            //         height: 20px; /* Height of the circle */
            //         background-color: grey; /* Circle color */
            //         border-radius: 50%; /* Make it circular */
            //         display: flex; /* Flexbox for centering text */
            //         align-items: center; /* Center vertically */
            //         justify-content: center; /* Center horizontally */
            //         color: white; /* Text color */
            //         font-weight: bold; /* Bold text */
            //     }

            // `}</style>
//         </div>
//     );
// }


// tool page on home page
// 'use client';

// import { useState, useEffect, useContext } from "react";
// import { useRouter } from 'next/navigation';
// import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faDownload } from '@fortawesome/free-solid-svg-icons';
// import { AuthContext } from '@/app/providers/providers';

// export const fetchCache = 'force-no-store';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// export default function Tool() {
//     const { user } = useContext(AuthContext);
//     const router = useRouter();

//     const [prediction, setPrediction] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [numOutputs, setNumOutputs] = useState(1);
//     const [seed, setSeed] = useState('');
//     const [warning, setWarning] = useState('');
//     const [loginWarning, setLoginWarning] = useState(false);  // Add a state to handle login warning

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!user) {
//             setLoginWarning(true);  // Show login warning if user is not logged in
//             return;
//         }

//         setLoading(true);
//         setError(null);

//         // Fetch user's credits from the database
//         const creditsResponse = await fetch("/api/check-credits", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: user.email }), // Send user's email to check credits
//         });

//         const { credits } = await creditsResponse.json();

//         // Check user credits
//         if (credits < numOutputs) {
//             setWarning(`You do not have enough credits to generate ${numOutputs} image(s). Please purchase more credits.`);
//             setLoading(false);
//             return;
//         }

//         const response = await fetch("/api/predictions", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 prompt: e.target.prompt.value,
//                 num_outputs: parseInt(numOutputs, 10),
//                 seed: seed || null,
//             }),
//         });

//         let prediction = await response.json();
//         if (response.status !== 201) {
//             setError(prediction.detail);
//             setLoading(false);
//             return;
//         }

//         setPrediction(prediction);

//         let generatedCount = 0; // Variable to count the number of images generated
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

//             // Check if images were generated in this status update
//             if (prediction.output && prediction.output.length > generatedCount) {
//                 generatedCount = prediction.output.length; // Update the count
//             }
//         }

//         // Deduct credits based on the number of images generated
//         if (generatedCount > 0) {
//             await fetch("/api/deduct-credits", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     email: user.email,
//                     creditsToDeduct: generatedCount,
//                 }),
//             });
//         }

//         setLoading(false);
//     };

//     const handleDownload = async () => {
//         const imageUrl = prediction.output[prediction.output.length - 1];
//         const response = await fetch(imageUrl);
//         const blob = await response.blob();

//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'urban-script.png';
//         document.body.appendChild(link);
//         link.click();

//         document.body.removeChild(link);
//         URL.revokeObjectURL(link.href);
//     };

//     return (
//         <div className="container mx-auto px-4 sm:px-8 py-8">
//             <h1 className="py-6 text-center font-bold text-3xl text-white">
//                 Generate Images with UrbanScript
//             </h1>

//             {/* Login Warning Section */}
//             {loginWarning && (
//                 <div className="text-red-500 text-center py-2">
//                     You must be logged in to generate images.
//                     <br />
//                     <button
//                         className="text-blue-500 underline"
//                         onClick={() => router.push('/login')}
//                     >
//                         Click here to login
//                     </button>
//                 </div>
//             )}

//             {/* Input Form Section */}
//             <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
//                 {/* Input and Guidance Section */}
//                 <div className="flex flex-col lg:flex-row gap-8">
//                     {/* Left Section: Input Fields */}
//                     <div className="flex flex-col gap-4 w-full lg:w-1/2">
//                         <div className="flex items-center gap-4">
//                             <div className="flex-1">
//                                 <label className="block text-white mb-1">
//                                     Number of Outputs (1-4):
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     max="4"
//                                     value={numOutputs}
//                                     onChange={(e) => setNumOutputs(e.target.value)}
//                                     className="p-2 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                                     placeholder="1"
//                                 />
//                             </div>
//                             <div className="flex-1">
//                                 <label className="block text-white mb-1">
//                                     Seed (Optional):
//                                 </label>
//                                 <input
//                                     type="number"
//                                     value={seed}
//                                     onChange={(e) => setSeed(e.target.value)}
//                                     className="p-2 w-full rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                                     placeholder="2024"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Right Section: Guidance */}
//                     <div className="flex-1 bg-white rounded-lg p-4 shadow-md">
//                         <h3 className="font-bold mb-2">Onboarding Steps</h3>
//                         <ol className="list-decimal list-inside text-gray-700 custom-ordered-list">
//                             <li> (MUST)Refresh this page to get up-to-date <b>Credits</b>.</li>
//                             <li>Select the number of outputs (1-4) you want to generate.</li>
//                             <li>Optionally, enter a seed value for consistent results across generations.</li>
//                             <li>Click <b>Generate</b> button to start the image generation process.</li>
//                             <li>Download and Own your images. (we do not store your images at the moment)</li>
//                         </ol>
//                     </div>
//                 </div>

//                 {/* Existing Prompt Input and Button Section */}
//                 <div className="flex flex-col lg:flex-row lg:items-end gap-4 w-full mt-4">
//                     <input
//                         type="text"
//                         className="flex-grow p-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
//                         name="prompt"
//                         placeholder="Enter a prompt to generate"
//                     />
//                     <button className="button w-full lg:w-auto" type="submit">
//                         Generate
//                     </button>
//                 </div>

//                 {warning && (
//                     <div className="text-yellow-500 py-2">
//                         {warning}
//                         <br />
//                         <a href="/pricing" className="text-blue-500 underline">Go to Pricing</a>
//                     </div>
//                 )}
//             </form>

//             {error && <div className="text-red-500 py-2">{error}</div>}

//             {loading && (
//                 <div className="loader-wrapper">
//                     <div className="loader"></div>
//                     <p>Processing...</p>
//                 </div>
//             )}

//             {prediction && prediction.output && (
//                 <div className="image-gallery grid gap-4 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//                     {prediction.output.map((url, index) => (
//                         <div key={index} className="relative image-item">
//                             <Image
//                                 src={url}
//                                 alt={`Output ${index + 1}`}
//                                 sizes="100vw"
//                                 height={prediction.output.length === 1 ? 768 : 384}
//                                 width={prediction.output.length === 1 ? 768 : 384}
//                                 className="rounded-lg shadow-lg"
//                             />
//                             <button
//                                 onClick={() => handleDownload(index)}
//                                 className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white shadow hover:bg-blue-700 transition"
//                                 aria-label={`Download image ${index + 1}`}
//                             >
//                                 <FontAwesomeIcon icon={faDownload} size="lg" />
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {prediction && (
//                 <p className="py-3 text-sm opacity-50 text-gray-300">
//                     status: {prediction.status}
//                 </p>
//             )}

            // <style jsx>{`
            //     .container {
            //         background: linear-gradient(to bottom right, #1f1c2c, #928dab);
            //         border-radius: 15px;
            //         padding: 2rem;
            //         box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            //     }
            //     .button {
            //         background: #38a169;
            //         color: white;
            //         padding: 1rem 2rem;
            //         border: none;
            //         border-radius: 8px;
            //         font-weight: bold;
            //         cursor: pointer;
            //         transition: background 0.3s;
            //     }
            //     .button:hover {
            //         background: #2f855a;
            //     }
            //     .loader-wrapper {
            //         display: flex;
            //         align-items: center;
            //         justify-content: center;
            //         flex-direction: column;
            //         padding: 2rem 0;
            //     }
            //     .loader {
            //         border: 8px solid rgba(255, 255, 255, 0.3);
            //         border-top: 8px solid #fff;
            //         border-radius: 50%;
            //         width: 40px;
            //         height: 40px;
            //         animation: spin 1s linear infinite;
            //     }
            //     @keyframes spin {
            //         0% {
            //             transform: rotate(0deg);
            //         }
            //         100% {
            //             transform: rotate(360deg);
            //         }
            //     }
            //     .image-gallery {
            //         display: grid;
            //         gap: 1rem;
            //     }
            //     .image-item {
            //         position: relative;
            //         overflow: hidden;
            //     }
            //     .custom-ordered-list {
            //         list-style: none; /* Remove default list styling */
            //         padding: 0; /* Remove padding */
            //         counter-reset: item; /* Reset counter */
            //     }

            //     .custom-ordered-list li {
            //         position: relative; /* Position relative for absolute positioning of the number */
            //         padding-left: 30px; /* Space for the circle */
            //         margin-bottom: 10px; /* Space between list items */
            //     }

            //     .custom-ordered-list li::before {
            //         content: counter(item); /* Remove the dot */
            //         counter-increment: item; /* Increment the counter */
            //         position: absolute; /* Position absolutely */
            //         left: 0; /* Align to the left */
            //         top: 0; /* Align to the top */
            //         width: 20px; /* Width of the circle */
            //         height: 20px; /* Height of the circle */
            //         background-color: grey; /* Circle color */
            //         border-radius: 50%; /* Make it circular */
            //         display: flex; /* Flexbox for centering text */
            //         align-items: center; /* Center vertically */
            //         justify-content: center; /* Center horizontally */
            //         color: white; /* Text color */
            //         font-weight: bold; /* Bold text */
            //     }

            // `}</style>
//         </div>
//     );
// }


'use client';

import { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setLoginWarning(true);
            setShowModal(true);  // Show the modal
            return;
        }

        setLoading(true);
        setError(null);

        // Fetch user's credits
        const creditsResponse = await fetch("/api/check-credits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
        });

        const { credits } = await creditsResponse.json();

        // Check user credits
        if (credits < numOutputs) {
            setWarning(`You do not have enough credits to generate ${numOutputs} image(s). Please purchase more credits.`);
            setLoading(false);
            setShowModal(true);  // Show the modal for insufficient credits
            return;
        }

        const response = await fetch("/api/predictions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: e.target.prompt.value,
                num_outputs: parseInt(numOutputs, 10),
                seed: seed || null,
            }),
        });

        let prediction = await response.json();
        if (response.status !== 201) {
            setError(prediction.detail);
            setLoading(false);
            return;
        }

        setPrediction(prediction);

        let generatedCount = 0;
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

            if (prediction.output && prediction.output.length > generatedCount) {
                generatedCount = prediction.output.length;
            }
        }

        if (generatedCount > 0) {
            await fetch("/api/deduct-credits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    creditsToDeduct: generatedCount,
                }),
            });
        }

        setLoading(false);
    };

    // const handleDownload = async () => {
    //     const imageUrl = prediction.output[prediction.output.length - 1];
    //     const response = await fetch(imageUrl);
    //     const blob = await response.blob();

    //     const link = document.createElement('a');
    //     link.href = URL.createObjectURL(blob);
    //     link.download = 'urban-script.png';
    //     document.body.appendChild(link);
    //     link.click();

    //     document.body.removeChild(link);
    //     URL.revokeObjectURL(link.href);
    // };


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
