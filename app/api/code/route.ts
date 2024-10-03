import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructions: ChatCompletionMessageParam = {
  role: "system",
  content:
    "You are a code generator. Always respond with code snippets formatted in markdown code blocks. Use triple backticks (```) to enclose your code, and specify the language immediately after the opening backticks. Explain your code using comments within the code blocks. For example:\n\n```python\n# Your code here\n# with comments\n```\n\nDo not provide any explanation outside of the code blocks unless specifically asked.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { messages } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse(
        "Free trial limit exceeded. Please upgrade your account.",
        { status: 403 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructions, ...messages],
    });

    await increaseApiLimit();
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("Code Error:", error);
    return new NextResponse("An error occurred. Please try again.", {
      status: 500,
    });
  }
}
