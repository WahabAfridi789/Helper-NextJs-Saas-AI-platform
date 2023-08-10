import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

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

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructions, ...messages],
    });

    return NextResponse.json(response.data.choices[0].message);
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
