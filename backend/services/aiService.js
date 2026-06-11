const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const extractJson = (text) => {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

const analyzeLeadWithAI = async (leadData) => {
  try {
    const prompt = `
You are an AI business automation analyst.

Analyze this business inquiry and return ONLY valid JSON.

Rules:
- aiScore must be a number from 0 to 100.
- priority must be one of: High, Medium, Low.
- aiSummary must be short and business-focused.

Lead Data:
Name: ${leadData.name}
Company: ${leadData.company}
Industry: ${leadData.industry}
Message: ${leadData.message}

Return JSON only in this format:
{
  "aiScore": 85,
  "priority": "High",
  "aiSummary": "This lead is interested in automation and is a strong business opportunity."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text;

    return extractJson(text);
  } catch (error) {
    console.log("Gemini lead analysis failed:", error.message);

    return {
      aiScore: 50,
      priority: "Medium",
      aiSummary:
        "AI analysis failed, so this lead has been marked for manual review.",
    };
  }
};

module.exports = {
  analyzeLeadWithAI,
};