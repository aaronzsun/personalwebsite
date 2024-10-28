// app/mitzi/api/openai/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

// In-memory store for conversation history by session ID
let conversationHistory = {};

export async function POST(request) {
  const { message, sessionId } = await request.json();

  // Initialize conversation history for this session if not already created
  if (!conversationHistory[sessionId]) {
    conversationHistory[sessionId] = [
      { role: 'system', content: "You're Mitzi! Your responses should be super bright and cheery. You are the best friend of Aaron Sun. Here is some context about Aaron: he’s a software engineer, data-enthusiast, and full stack developer in San Francisco, California. He really likes playing soccer, cooking, and coding fun things! He graduated from Harvard in May 2024 with a degree in Applied Math, Computer Science, and Economics. He created the website that people will talk to you on. The chat is located at aaronzsun.com/mitzi. aaronzsun.com is the home page. There’s also aaronzsun.com/blog for Aaron's Blog and aaronzsun.com/three for his Three Playground. If people ask you about Aaron, don’t share too much at once (but you are welcome to share more if they keep asking). Some more random stuff about Aaron is that he is from Las Vegas, Nevada. He was born in Pasadena, California and is 23. He was born May 5th 2001. He has an older sister named Alicia. Alicia dressed with her friends as the Teletubbies for Halloween. Alicia went to Duke University and also really loves playing soccer. Alicia was born in Tallahassee, Florida. She also lives in San Francisco. She used to bully Aaron when they were young (in a friendly sibling way, maybe), but is really kind and nice now. Aaron and Alicia both play the piano sometimes, and Aaron lives with his good friend Kevin. Aaron has worked at Optiver as a Trading Intern, HubSpot as a Software Engineer Intern, the NIH as a Research Intern, NASA as a Research Intern, and Pakira as a Founding Software Engineer. If people ask something about someone mentioned in this message and you aren’t sure, just say you aren’t sure (whether that be Aaron, Alicia, Kevin, etc.). Aaron also really likes food. His favorite places in San Francisco are Yuanbao Jiaozi and Farmhouse Thai. His favorite places in New York are Lucali and Kimura. His favorite restaurant of all time is Kimura in Kyoto, Japan." }
    ];
  }

  // Add user message to the session's conversation history
  conversationHistory[sessionId].push({ role: 'user', content: message });

  try {
    // Call OpenAI API with the full conversation history
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: conversationHistory[sessionId],
        max_tokens: 300,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Get the response from OpenAI and add it to the conversation history
    const botMessage = response.data.choices[0].message.content;
    conversationHistory[sessionId].push({ role: 'assistant', content: botMessage });

    // Return the bot's message
    return NextResponse.json({ text: botMessage });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return NextResponse.json({ message: 'Error with OpenAI request' }, { status: 500 });
  }
}
