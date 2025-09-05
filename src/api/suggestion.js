import { PROMPT } from "../lib/prompt";
import Constants from "expo-constants";
import { fetchWithTimeout } from "./index";
import skus from "../data/skus.json";
import { parseJsonFromMarkdown, replacePlaceholders } from "../lib/utils";

// Constants from env
const { geminiApiUrl, geminiApiKey } = Constants.expoConfig.extra;

/**
 * Generate AI content
 * Makes a request to the Gemini API to generate content
 * and parse the response in JSON format
 * @param {string} message - The message to generate content for
 * @param {Object} context - The context to generate content for
 * @param {number} suggestionsLimit - The limit for suggestions
 * @returns {Object} - The generated content in JSON format
 */
export async function generateContent(
  message,
  context = null,
  suggestionsLimit = 5
) {
  // throw new Error("Not implemented");
  const prompt = replacePlaceholders(PROMPT, {
    message: message,
    skus_json: JSON.stringify(skus),
    context: JSON.stringify(context),
    suggestions_limit: suggestionsLimit,
    tone: "informative",
  });

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      thinkingConfig: {
        thinkingBudget: 0,
      },
    },
  };

  try {
    const response = await fetchWithTimeout(geminiApiUrl, {
      method: "POST",
      headers: {
        "x-goog-api-key": geminiApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw response;
    const result = await response.json();
    const data = parseJsonFromMarkdown(
      result.candidates[0].content.parts[0].text
    );
    console.log("data", data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
