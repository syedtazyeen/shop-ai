import "dotenv/config";

export default {
  expo: {
    name: "ai-shopper",
    extra: {
      geminiApiUrl: process.env.GEMINI_API_URL,
      geminiApiKey: process.env.GEMINI_API_KEY,
    },
  },
};
