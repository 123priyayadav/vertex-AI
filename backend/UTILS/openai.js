// ✅ openai.js
import "dotenv/config";
import fetch from "node-fetch";

const getGeminiAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }],
    }),
  };

  try {
    // ✅ Use correct model endpoint (backticks required for template literal)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      options
    );

    const data = await response.json();
    console.log("🔎 Gemini raw response:", JSON.stringify(data, null, 2));

    // ✅ Parse Gemini's response safely
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return text;
    } else {
      console.warn("⚠️ Gemini API gave no text output");
      return "⚠️ Gemini API gave no text output";
    }
  } catch (err) {
    console.error("❌ Gemini API Error:", err.message);
    return "❌ Error calling Gemini API";
  }
};

export default getGeminiAPIResponse;
