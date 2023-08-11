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
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
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
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });

      await increaseApiLimit();
      return NextResponse.json(response.data.choices[0].message);
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
