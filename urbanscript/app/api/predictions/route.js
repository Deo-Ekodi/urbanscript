    // version: '8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f', -- SXDL
    // version: '76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38', -- room AI


// import { NextResponse } from "next/server";
// import Replicate from "replicate";
 
// export const fetchCache = 'force-no-store';

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN,
// });
 
// // In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// // In development (on your local machine), the NGROK_HOST environment variable is set.
// const WEBHOOK_HOST = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : process.env.NGROK_HOST;
 
// export async function POST(request) {
//   if (!process.env.REPLICATE_API_TOKEN) {
//     throw new Error(
//       'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
//     );
//   }
 
//   const { prompt } = await request.json();
 
//   const options = {
//     version: '8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f',
//     input: { prompt }
//   }
 
//   if (WEBHOOK_HOST) {
//     options.webhook = `${WEBHOOK_HOST}/api/webhooks`
//     options.webhook_events_filter = ["start", "completed"]
//   }
 
//   // A prediction is the result you get when you run a model, including the input, output, and other details
//   const prediction = await replicate.predictions.create(options);
 
//   if (prediction?.error) {
//     return NextResponse.json({ detail: prediction.error }, { status: 500 });
//   }
 
//   return NextResponse.json(prediction, { status: 201 });
// }

// 76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38

import { NextResponse } from "next/server";
import Replicate from "replicate";

export const fetchCache = 'force-no-store';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('The REPLICATE_API_TOKEN environment variable is not set.');
  }

  const { prompt, image } = await request.json(); // Get prompt and image URL

  const options = {
    version: '76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38', // Replace with your actual model ID
    input: {
      prompt: prompt,
      file: image, // Use the URL from the file upload
    },
  };

  try {
    const prediction = await replicate.predictions.create(options);

    if (prediction?.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json({ detail: "Failed to create prediction" }, { status: 500 });
  }
}
