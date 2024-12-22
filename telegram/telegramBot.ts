import { Bot } from "grammy";

enum TelegramBotCommands {
  START = "start",
}

const createTelegramBot = (token: string): Bot => {
  const bot = new Bot(token);

  bot.command(TelegramBotCommands.START, (context) =>
    context.reply("Hello! I am a Nazar Loiko!")
  );

  bot.on("message", (context) => context.reply("Your mum :D"));

  return bot;
};

export { createTelegramBot };

export class TelegramBotFactory {
  private static bot: Bot;

  private static addCommands(bot: Bot) {
    bot.command("start", (context) =>
      context.reply("Hello! I am a Nazar Loiko!")
    );
  }

  private static addListeners(bot: Bot) {
    bot.on("message", (context) => context.reply("Your mum :D"));
  }

  public buildBot(token: string): Bot {
    const bot = new Bot(token);

    TelegramBotFactory.addCommands(bot);
    TelegramBotFactory.addListeners(bot);

    return bot;
  }
}
