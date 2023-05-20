import { NextRequest, NextResponse } from 'next/server';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface OpenAIChat{
  role: 'system' | 'user' | 'assistant'
  content: string;
}
 
export async function POST(request: Request) {
  const body = await request.json()
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages: body.messages,
  });

  return NextResponse.json({
    completion: completion.data.choices[0].message,
  })

}