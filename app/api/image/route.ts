import { Configuration, OpenAIApi } from "openai";

import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  console.log("Conversation Request: ", req);

  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAi API key Not configured", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("prompt is required.", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("amount is required.", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("resolution is required.", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse(
        "You have exceeded the free trial limit of 5 requests. Please upgrade your account.",
        { status: 403 }
      );
    } else {
      const response = await openai.createImage({
        prompt,
        n: parseInt(amount, 10),
        size: resolution,
      });

      await increaseApiLimit();

      return NextResponse.json(response.data.data);
    }
  } catch (error) {
    console.log("Image Error: ", error);
    return new NextResponse(
      "Sorry, I'm having trouble understanding you. Please try again.",
      {
        status: 500,
      }
    );
  }
}
