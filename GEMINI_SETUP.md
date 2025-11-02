# Gemini API Setup Guide

## Overview
Your application now uses Google's Gemini API through OpenAI's SDK for AI chat functionality.

## Backend Configuration

### 1. Environment Variable
Add this to your `.env` file in the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Get Your Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

### 3. Install Required Package
Make sure you have the OpenAI package installed:

```bash
npm install openai
```

## How It Works

### Backend (`backend/controllers/ai.controller.js`)
- Uses OpenAI SDK to connect to Gemini's OpenAI-compatible endpoint
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/openai/`
- Model: `gemini-2.0-flash`
- Sends conversation history with system prompt containing context from your database
- Returns response in OpenAI-compatible format

### Frontend (`src/components/AIChatPanel.jsx`)
- Sends user messages with conversation history to backend
- Handles Gemini's response format (message object with content)
- Displays AI responses in chat interface
- Shows proper error messages if API key is missing or other errors occur

## Response Format

Gemini returns responses in this format:
```javascript
{
  response: {
    role: "assistant",
    content: "The AI's response text here"
  },
  context: {
    postsFound: 5,
    shastarsFound: 3,
    resourcesFound: 2,
    categoriesFound: 1
  }
}
```

## Testing

1. Start your backend server
2. Open the frontend application
3. Click the AI chat button (sparkles icon in bottom-right)
4. Send a message about martial arts, weapons, or any Shastarkosh content
5. The AI will respond using Gemini with context from your database

## Troubleshooting

### Error: "GEMINI_API_KEY not configured"
- Make sure you added `GEMINI_API_KEY` to your `.env` file
- Restart your backend server after adding the key

### Error: "Invalid API key"
- Verify your API key is correct
- Check if the key has proper permissions in Google AI Studio

### No response or timeout
- Check your internet connection
- Verify the Gemini API service is available
- Check backend logs for detailed error messages

## Features

✅ Context-aware responses using your database content
✅ Conversation history (last 4 messages)
✅ Real-time chat interface
✅ Error handling and user feedback
✅ Proper message formatting
