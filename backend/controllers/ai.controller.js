import "dotenv/config";
import OpenAI from "openai";

import logger from "../../src/utils/logger.utils.js";
import Category from "../models/Category.model.js";
import ForumPost from "../models/ForumPost.model.js";
import ResourceMaterial from "../models/ResourceMaterial.model.js";
import ShastarInfo from "../models/ShastarInfo.model.js";

// Gemini API - OpenAI Compatible
const GEMINI_API_KEY = process.env.GEMINI_MODEL_FACE_API_KEY || "";

const openai = new OpenAI({
  apiKey: GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

/**
 * Fetch relevant context from database based on user query
 */
async function fetchRelevantContext(query, limit = 10) {
  try {
    const searchQuery = { $text: { $search: query } };
    const context = {
      posts: [],
      shastars: [],
      resources: [],
      categories: [],
    };

    // Fetch relevant posts
    const posts = await ForumPost.find(searchQuery, { score: { $meta: "textScore" } })
      .select("title content tags category")
      .sort({ score: { $meta: "textScore" } })
      .limit(limit);
    context.posts = posts.map((p) => ({
      title: p.title,
      content: p.content?.substring(0, 200),
      tags: p.tags,
    }));

    // Fetch relevant shastars
    const shastars = await ShastarInfo.find(searchQuery, { score: { $meta: "textScore" } })
      .select("title description type subType origin tags")
      .sort({ score: { $meta: "textScore" } })
      .limit(limit);
    context.shastars = shastars.map((s) => ({
      title: s.title,
      description: s.description?.substring(0, 200),
      type: s.type,
      subType: s.subType,
      tags: s.tags,
    }));

    // Fetch relevant resources
    const resources = await ResourceMaterial.find(searchQuery, { score: { $meta: "textScore" } })
      .select("title description origin tags")
      .sort({ score: { $meta: "textScore" } })
      .limit(limit);
    context.resources = resources.map((r) => ({
      title: r.title,
      description: r.description?.substring(0, 200),
      tags: r.tags,
    }));

    // Fetch relevant categories
    const categories = await Category.find(searchQuery, { score: { $meta: "textScore" } })
      .select("name description categoryType")
      .sort({ score: { $meta: "textScore" } })
      .limit(8);
    context.categories = categories.map((c) => ({
      name: c.name,
      description: c.description,
      type: c.categoryType,
    }));

    return context;
  } catch (error) {
    console.error("Error fetching context:", error);
    return { posts: [], shastars: [], resources: [], categories: [] };
  }
}

/**
 * Build system prompt with context
 */

// role: 'system',crucible steel production in that time vs in this modern time why modern architectures fal
function buildSystemPrompt(context) {
  let prompt = `You are an AI assistant for Shastarkosh, a platform dedicated to martial arts, ancient weapons (shastars), Ayurvedic knowledge, and historical resources.

**Your Role:**
- Answer questions about martial arts, weapons, history, and related topics
- PRIORITIZE information from the "Relevant Context" sections provided below when available
- Use your general knowledge to supplement and provide comprehensive answers
- Be helpful, accurate, and informative

**Guidelines:**
1. If relevant context is provided, incorporate it into your answer and mention it's from the Shastarkosh database
2. Combine context information with your general knowledge for complete answers
3. For specific questions about items in the database, reference the context directly
4. For general questions, provide helpful answers using your knowledge
5. Be conversational and engaging while maintaining accuracy

Provide clear, concise answers. You can use both the provided context and your training knowledge to give the best possible response.`;
;
//   let prompt = `You are an AI assistant for Shastarkosh, a platform dedicated to martial arts, ancient weapons (shastars), Ancient and historical knowledge resources for the people, by the people.

// **Your Role:**
// - Answer questions about martial arts, weapons, history, and related topics
// - Search: Look through the "Relevant Forum Posts," "Relevant Shastars," "Relevant Resources," and "Relevant Categories" provided. PRIORITIZE information from the "Relevant Context" sections provided below when available
// - Use your general knowledge to supplement and provide comprehensive answers
// - Be helpful, accurate, and informative

// **Guidelines:**
// 1. If relevant context is provided, incorporate it into your answer and mention it's from the Shastarkosh database
// 2. Combine context information with your general knowledge for complete answers
// 3. For specific questions about items in the database, reference the context directly
// 4. For general questions, provide helpful answers using your knowledge
// 5. Be conversational and engaging while maintaining accuracy

// Provide clear, concise answers. You can use both the provided context and your training knowledge to give the best possible response.`;

  // Add context if available
  if (context.posts.length > 0) {
    prompt += `\nRelevant Forum Posts:\n`;
    context.posts.forEach((post, i) => {
      prompt += `${i + 1}. "${post.title}": ${post.content}\n`;
    });
  }

  if (context.shastars.length > 0) {
    prompt += `\nRelevant Shastars:\n`;
    context.shastars.forEach((shastar, i) => {
      prompt += `${i + 1}. ${shastar.title} (${shastar.type}/${shastar.subType}): ${shastar.description}\n`;
    });
  }

  if (context.resources.length > 0) {
    prompt += `\nRelevant Resources:\n`;
    context.resources.forEach((resource, i) => {
      prompt += `${i + 1}. "${resource.title}": ${resource.description}\n`;
    });
  }

  if (context.categories.length > 0) {
    prompt += `\nRelevant Categories:\n`;
    context.categories.forEach((cat, i) => {
      prompt += `${i + 1}. ${cat.name} (${cat.type}): ${cat.description}\n`;
    });
  }

  return prompt;
}

/**
 * Call Gemini API via OpenAI-compatible interface
 */
async function callGeminiAPI(userMessages) {
  // logger("info", "received messages", userMessages, userMessages[userMessages.length - 1].content);
  // logger("info", "Calling Gemini API");
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not configured. Please set it in your .env file");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: userMessages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    logger("success", response.choices[0].message);
    return response.choices[0].message;
  } catch (error) {
    logger("error", "Gemini API call failed:", error, error.message);
    throw error;
  }
}

/**
 * Main AI chat endpoint
 */
export const aiChat = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    // logger("info", "AI Chat",message);
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Fetch relevant context from database
    const context = await fetchRelevantContext(message);
    // logger("info", "AI context",context);

    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(context);
    // logger("info", "AI systemPrompt",systemPrompt);
    // Prepare messages for AI
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.slice(-4), // Keep last 4 messages for context
      { role: "user", content: message },
    ];

    // Call AI API
    logger("info", {
      message,
      conversationHistory,
      context: {
        postsFound: context.posts.length,
        shastarsFound: context.shastars.length,
        resourcesFound: context.resources.length,
        categoriesFound: context.categories.length,
      },
    });
    const aiResponse = await callGeminiAPI(messages);
    res.json({
      response: aiResponse,
      context: {
        postsFound: context.posts.length,
        shastarsFound: context.shastars.length,
        resourcesFound: context.resources.length,
        categoriesFound: context.categories.length,
      },
    });
  } catch (error) {
    logger("error", "AI Chat Error:", error);
    res.status(500).json({
      error: "Failed to process AI request",
      message: error.message,
    });
  }
};

/**
 * Get context endpoint (for debugging)
 */
export const getContext = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const context = await fetchRelevantContext(query);
    res.json(context);
  } catch (error) {
    console.error("Get Context Error:", error);
    res.status(500).json({ error: "Failed to fetch context" });
  }
};
