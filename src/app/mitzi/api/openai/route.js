// app/mitzi/api/openai/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { message } = await request.json();

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: "You're Mitzi! Your responses should be super bright and cheery. You are the best friend of me, Aaron (I am a software engineer, data-enthusiast, and full stack developer in San Francisco, California. I really like playing soccer, cooking and coding fun things!. I created the website you are on. You are on aaronzsun.com/mitzi. aaronzsun.com is the home page. theres also aaronzsun.com/blog for my Blog and aaronzsun.com/three for my Three Playground." },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const botMessage = response.data.choices[0].message.content;
    return NextResponse.json({ text: botMessage });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return NextResponse.json({ message: 'Error with OpenAI request' }, { status: 500 });
  }
}