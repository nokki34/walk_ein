import { MiddlewareFn, NarrowedContext } from "telegraf";
import { addAssignee, getSlots, removeAssignee } from "../app/time-slots";
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

const pick: Handler = async (ctx, ...rest) => {
  const slots = getSlots();
  try {
    const [_command, indexString] = ctx.update.message.text.split(" ");
    const index = Number(indexString);

    // checks
    if (Number.isNaN(index)) {
      throw new Error("Неверный аргумент(выбери номер из списка /schedule)");
    }

    const slot = slots[index];
    if (!slot) {
      throw new Error(`Слот с номером ${index} не найден`);
    }
    if (slot.assignee) {
      throw new Error(`Этот слот уже занят @${slot.assignee.name}`);
    }

    await addAssignee(slot, {
      telegramId: ctx.message.chat.id,
      name: ctx.message.chat.username,
    });
    ctx.reply(`Вы выбрали день: ${formatDay(slot.date)}`);
  } catch (e) {
    ctx.reply(e.message);
  }
};

const cancel: Handler = async (ctx, ...rest) => {
  const slots = getSlots();
  try {
    const [_command, indexString] = ctx.update.message.text.split(" ");
    const index = Number(indexString);

    // checks
    if (Number.isNaN(index)) {
      throw new Error("Неверный аргумент(выбери номер из списка /schedule)");
    }

    const slot = slots[index];
    if (!slot) {
      throw new Error(`Слот с номером ${index} не найден`);
    }
    if (!slot.assignee) {
      throw new Error(`Этот слот итак свободен`);
    }
    if (slot.assignee.telegramId !== ctx.message.chat.id) {
      throw new Error(`Вы не можете отменить чужую запись`);
    }

    await removeAssignee(slot);
    ctx.reply(`Вы отменили день: ${formatDay(slot.date)}`);
  } catch (e) {
    ctx.reply(e.message);
  }
};

const commands: Record<string, Handler> = {
  greeting,
  help,
  schedule,
  pick,
  cancel,
};

export { commands };
