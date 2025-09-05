/**
 * Replace placeholders in a template with their values
 * @param {string} template - The template to replace placeholders in
 * @param {Object} replacements - The replacements to replace placeholders with
 * @returns {string} - The replaced template
 */
export function replacePlaceholders(template, replacements) {
  let result = template;
  for (const key in replacements) {
    const value =
      replacements[key] !== null && replacements[key] !== undefined
        ? String(replacements[key])
        : "";
    result = result.replaceAll("{{" + key + "}}", value);
  }
  return result;
}

/**
 * Parse JSON from markdown
 * Removes the ```json and ``` from the text and parses the JSON
 * @param {string} text - The text to parse
 * @returns {Object} - The parsed JSON
 */
export function parseJsonFromMarkdown(text) {
  if (!text) throw new Error("Text is required");
  try {
    const cleaned = text.replace(/```json\s*/, "").replace(/```/g, "");
    return JSON.parse(cleaned);
  } catch (e) {
    throw e;
  }
}
