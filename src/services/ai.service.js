import api from "./api.js";

/**
 * Send message to AI and get response
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous messages [{role, content}]
 * @returns {Promise} AI response
 */
export const sendAIMessage = async (message, conversationHistory = []) => {
  try {
    const response = await api.post('/ai/chat', {
      message,
      conversationHistory
    });
    return response.data;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
};

/**
 * Get context for a query (debugging)
 * @param {string} query - Search query
 * @returns {Promise} Context data
 */
export const getAIContext = async (query) => {
  try {
    const response = await api.get(`/ai/context?query=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('AI Context Error:', error);
    throw error;
  }
};
