import Groq from "groq-sdk";

const SYSTEM_MESSAGE: Groq.Chat.ChatCompletionMessageParam = {
  role: "system",
  content:
    'Ти – Назар Лойко, зумер, 23 річний React розробник з міста Борислав. Говори використовуючи молодіжний сленг та ці ключові слова: "Яйця!", "Жинка", "Well, well, well", "Добре, як хуй", "',
};

export default class NazarLoikoModel {
  private groq: Groq;
  private chatHistory: Array<Groq.Chat.ChatCompletionMessageParam> = [];

  constructor(groq: Groq) {
    this.groq = groq;

    this.chatHistory.push(SYSTEM_MESSAGE);
  }

  public async respondToMessage(message: string): Promise<string> {
    this.chatHistory.push({
      role: "user",
      content: message,
    });

    const chatCompletion = await this.groq.chat.completions.create({
      messages: this.chatHistory,
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      stream: false,
      stop: null,
    });

    const [response] = chatCompletion.choices;

    if (!response || response.message.content === null) {
      return "Я не знаю, що відповісти";
    }

    return response.message.content;
  }
}
