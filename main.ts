import { createTelegramBot } from "./telegram/index.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("BOT_TOKEN");

if (TELEGRAM_BOT_TOKEN === undefined) {
  throw new Error("BOT_TOKEN is not set");
}

const telegramBot = createTelegramBot(TELEGRAM_BOT_TOKEN);

console.log("Bot is up and running!", telegramBot);

telegramBot.start();
