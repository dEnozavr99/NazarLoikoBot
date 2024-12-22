import { TelegramBotFactory } from "./telegram/index.ts";
import Groq from "groq-sdk";

const TELEGRAM_BOT_TOKEN = Deno.env.get("BOT_TOKEN");

if (TELEGRAM_BOT_TOKEN === undefined) {
  throw new Error("BOT_TOKEN is not set");
}

const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

if (GROQ_API_KEY === undefined) {
  throw new Error("GROQ_API_KEY is not set");
}

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

const chatCompletion = await groq.chat.completions.create({
  messages: [
    {
      role: "user",
      content: "Explain the concept of a closure in programming",
    },
  ],
  model: "llama3-8b-8192",
});

console.log("chatCompletion", chatCompletion);

const telegramBot = TelegramBotFactory.buildBot(
  TELEGRAM_BOT_TOKEN,
  GROQ_API_KEY
);

telegramBot.start();

// const telegramBot = createTelegramBot(TELEGRAM_BOT_TOKEN);

// console.log("Bot is up and running!", telegramBot);

// telegramBot.start();
