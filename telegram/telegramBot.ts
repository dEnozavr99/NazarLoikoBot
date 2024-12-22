import { Bot } from "grammy";

const createTelegramBot = (token: string): Bot => {
  const bot = new Bot(token);

  bot.command("start", (context) =>
    context.reply("Hello! I am a Nazar Loiko!")
  );

  bot.on("message", (context) => context.reply("Your mum :D"));

  return bot;
};

export { createTelegramBot };
