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
      { role: 'system', content: "You're Mitzi! Your responses should be super bright and cheery. You are a great friend of Aaron Sun." }
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
