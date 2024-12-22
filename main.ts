import { Bot } from "grammy";

const TOKEN = Deno.env.get("BOT_TOKEN");

if (TOKEN === undefined) {
  throw new Error("BOT_TOKEN is not set");
}

const bot = new Bot(TOKEN);

console.log("Bot is up and running!", bot);
