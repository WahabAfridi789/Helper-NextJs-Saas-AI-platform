import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  console.log("Conversation Request: ", req);

  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAi API key Not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required.", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse(
        "You have exceeded the free trial limit of 5 requests. Please upgrade your account.",
        { status: 403 }
      );
    } else {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
      });

      await increaseApiLimit();
      return NextResponse.json(response.choices[0].message);
    }
  } catch (error) {
    console.log("Conversation Error: ", error);
    return new NextResponse(
      "Sorry, I'm having trouble understanding you. Please try again.",
      {
        status: 500,
      }
    );
  }
}
