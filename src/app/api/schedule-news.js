import cron from "node-cron";
import { Configuration, OpenAIApi } from "openai";
import { PrismaClient } from "@prisma/client"; // Assuming Prisma is used

const prisma = new PrismaClient();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// API handler to trigger the cron job
export default async function handler(req, res) {
  // Schedule the cron job to run every day at 8 AM
  cron.schedule("0 8 * * *", async () => {
    try {
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
          content: generatedNews,
          published: true,
        },
      });

      console.log("News generated and saved successfully");
    } catch (error) {
      console.error("Error generating news:", error);
    }
  });

  res.status(200).json({ message: "Cron job setup completed" });
}
