import { Telegraf } from "telegraf";
import { commands } from "./commands";
import { startCron } from "./notification";

const commandsDescriptions = [
  {
    command: "greeting", // done
    description: "Привет! Я отвечаю за то, чтобы Эйн не скучал.",
  },
  {
    command: "help", // done
    description:
      "Ты можешь: посмотреть все расписание, чтобы понять какие дни уже заняты, а в какие дни Эйну понадобится твоя помощь!",
  },
  { command: "cute", description: "random image of Ein" }, // not done
  {
    command: "schedule",
    description: "a list of days and is it already booked", // done
  },
  { command: "pick", description: "(number) to choose the day." }, // done
  { command: "cancel", description: "(number) to cancel the day" }, // done
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
    startCron(bot);
    console.log("Bot is launched");
  };
};

export { createBot };
