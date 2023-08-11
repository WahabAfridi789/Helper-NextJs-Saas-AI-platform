import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructions: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer on in markdown code snippets. Use code blocks to format your code. Use comments to explain your code.Use the ``` to format your code. You must explain your code in comments.  ",
};

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
        messages: [instructions, ...messages],
      });

      await increaseApiLimit();
      return NextResponse.json(response.data.choices[0].message);
    }
  } catch (error) {
    console.log("Code Error: ", error);
    return new NextResponse(
      "Sorry, I'm having trouble understanding you. Please try again.",
      {
        status: 500,
      }
    );
  }
}
