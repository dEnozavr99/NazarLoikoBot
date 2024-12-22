import { Bot } from "grammy";
import Groq from "groq-sdk";

import NazarLoikoModel from "../model/model.ts";

enum TelegramBotCommands {
  START = "start",
}

const createTelegramBot = (token: string, qroq: Groq): Bot => {
  const bot = new Bot(token);

  bot.command(TelegramBotCommands.START, (context) =>
    context.reply("Hello! I am a Nazar Loiko!")
  );

  bot.on("message", async (context) => {});

  return bot;
};

export { createTelegramBot };

export class TelegramBotFactory {
  private static bot: Bot;
  private static groq: Groq;

  private static addCommands() {
    TelegramBotFactory.bot.command("start", (context) =>
      context.reply("Hello! I am a Nazar Loiko!")
    );
  }

  private static addListeners() {
    TelegramBotFactory.bot.on("message", async (context) => {
      const model = new NazarLoikoModel(TelegramBotFactory.groq);

      let response = "Яйця :(";

      if (context.message.text !== undefined) {
        response = await model.respondToMessage(context.message.text);
      }

      context.reply(response);
    });
  }

  public static buildBot(token: string, groqApiKey: string): Bot {
    TelegramBotFactory.bot = new Bot(token);
    TelegramBotFactory.groq = new Groq({ apiKey: groqApiKey });

    TelegramBotFactory.addCommands();
    TelegramBotFactory.addListeners();

    return TelegramBotFactory.bot;
  }
}
