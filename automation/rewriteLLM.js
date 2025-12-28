const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (original, refs) => {
  const prompt = `
Rewrite this article professionally.

Original:
${original}

Reference Articles:
${refs.join("\n\n")}

Add SEO headings, formatting, and references.
`;

  const res = await client.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });

  return res.choices[0].message.content;
};
