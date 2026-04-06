const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generateAIRecipes = async (ingredients) => {
  try {
    const prompt = `
You are a professional chef AI.
Generate 6 creative recipes using the following ingredients:
${ingredients.join(", ")}
Return strictly valid JSON in this format:
[
{
"title": "",
"description": "",
"difficulty": "",
"diet": "",
"cookingTime": "",
"ingredients": [],
"steps": [],
"tips": []
}
]
Rules:
- Return ONLY JSON
- No explanations
- No markdown
`;
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant"
    });

    let text = completion.choices[0].message.content;
    console.log("ai text here")
    console.log(text)
    console.log("ai ends")

    // Remove markdown if present
    text = text.replace(/```json/g, "").replace(/```/g, "");
    // Extract JSON array
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      console.log("AI returned no JSON");
      return [];
    }

    try {
  let cleaned = match[0];
  // Remove trailing commas before ] or }
  cleaned = cleaned.replace(/,\s*([\]}])/g, "$1");
  return JSON.parse(cleaned);
} catch (parseError) {
  console.log("JSON parse failed, raw AI output:");
  console.log(match[0]);
  return [];

}

  } catch (error) {
    console.log("AI error:", error);
    return [];
  }
};