import { MiddlewareFn, NarrowedContext } from "telegraf";
import { getSlots } from "../app/time-slots";
import { formatDay } from "./utils";

type Handler = MiddlewareFn<NarrowedContext<any, any>>;

const greeting: Handler = (ctx) => {
  const msg =
    "Привет! Я отвечаю за то, чтобы Эйн не скучал. Отправь команду /help чтобы узнать больше";
  ctx.reply(msg);
};

const help: Handler = (ctx) => {
  const msg = `Ты можешь: 
    - /schedule - посмотреть всё расписание, чтобы понять какие дни уже заняты, а в какие дни Эйну понадобится твоя помощь!
    - /cute - посмотреть на милашные фото Эйна 🐶
    - /pick n - Выбрать день из списка когда ты хочешь погулять.
    - /cancel n - О, нет! Ты не можешь погулять с Эйном в этот день? Ну, ничего не попишешь. Отмени, чтобы кто-то другой cмог заменить тебя!
  `;
  ctx.reply(msg);
  return;
};

const schedule: Handler = async (ctx) => {
  const slots = getSlots();
  const textSlots = slots.map(
    (it, i) =>
      `${i + 1}: ${formatDay(it.date)} - ${it.assignee ? "Занято" : "Свободно"}`
  );

  ctx.reply("Расписание:" + "\n" + textSlots.join("\n"));
};

const pick = () => {};

const commands: Record<string, Handler> = {
  greeting,
  help,
  schedule,
};

export { commands };
