import { Telegraf } from "telegraf";
import { commands } from "./commands";

const commandsDescriptions = [
  {
    command: "greeting",
    description: "Привет! Я отвечаю за то, чтобы Эйн не скучал.",
  },
  {
    command: "help",
    description:
      "Ты можешь: посмотреть все расписание, чтобы понять какие дни уже заняты, а в какие дни Эйну понадобится твоя помощь!",
  },
  { command: "cute", description: "random image of Ein" },
  {
    command: "schedule",
    description: "a list of days and is it already booked",
  },
  { command: "pick", description: "(number) to choose the day." },
  { command: "cancel", description: "(number) to cancel the day" },
];

const createBot = (token: string) => {
  const bot = new Telegraf(token);
  bot.telegram.setMyCommands(commandsDescriptions);

  // notification on a day: Гав-гав! Погуляй со мной! Сегодня никто не хочет со мной гулять, может ты сможешь?

  Object.entries(commands).forEach(([command, fn]) => {
    bot.command(command, fn);
  });

  return () => {
    console.log("Launching bot");
    bot.launch({});
    console.log("Bot is launched");
  };
};

export { createBot };
