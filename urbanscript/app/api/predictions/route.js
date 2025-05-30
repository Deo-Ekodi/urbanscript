// ##################################################

import { NextResponse } from "next/server";
import Replicate from "replicate";

export const fetchCache = 'force-no-store';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;

export async function POST(request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  // Parse the JSON body from the request
  const { prompt, num_outputs, seed, file, image } = await request.json();

  const options = {
    version: '8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f',
    input: { prompt }
  };

  // Add optional fields to the input if they are provided
  if (num_outputs) options.input.num_outputs = parseInt(num_outputs);
  if (seed) options.input.seed = parseInt(seed);
  if (file) {
    console.log("file URL: " + file);
    options.input.image = file; // Add the file URL to the input if provided
  }


  if (WEBHOOK_HOST) {
    options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
    options.webhook_events_filter = ["start", "completed"];
  }

  // Make the request to the Replicate API to create a prediction
  const prediction = await replicate.predictions.create(options);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction, { status: 201 });
}
