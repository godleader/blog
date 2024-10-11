import { PrismaClient } from "@prisma/client";
import { Configuration, OpenAIApi } from "openai";

const prisma = new PrismaClient();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    // Call OpenAI to generate the news content
    const response = await openai.createCompletion({
      model: "gpt-4",
      prompt: "Generate a daily news update for today based on global events.",
      max_tokens: 1000,
      temperature: 0.7,
    });

    const generatedNews = response.data.choices[0].text;

    // Store the generated news in the database using Prisma
    await prisma.post.create({
      data: {
        title: "Daily News Update - " + new Date().toLocaleDateString(),
        content: { text: generatedNews },  // Using JSON field to store content
        authorId: "some-author-id",  // You need to provide a valid author ID
        tags: {
          connect: [{ id: "some-tag-id" }],  // Example of connecting tags
        },
        isGenerated: true,  // Flag this as AI-generated content
        source: "GPT-4",    // Specify the source (e.g., GPT-4)
        type: "NEWS",       // Assuming you have a "PostType" enum with "NEWS"
      },
    });

    res.status(200).json({ message: "AI-generated news created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
