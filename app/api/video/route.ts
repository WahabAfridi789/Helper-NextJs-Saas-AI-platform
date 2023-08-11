import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

import Replicate from "replicate";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(req: Request) {
  console.log("Conversation Request: ", req);

  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt are required.", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse(
        "You have exceeded the free trial limit of 5 requests. Please upgrade your account.",
        { status: 403 }
      );
    } else {
      const response = await replicate.run(
        "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
        {
          input: {
            prompt,
          },
        }
      );

      await increaseApiLimit();

      return NextResponse.json(response);
    }
  } catch (error) {
    console.log("Video Error: ", error);
    return new NextResponse(
      "Sorry, I'm having trouble understanding you. Please try again.",
      {
        status: 500,
      }
    );
  }
}
