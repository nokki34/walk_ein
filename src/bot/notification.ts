import * as cron from "node-cron";
import { Telegraf } from "telegraf";
import { getSlots } from "../app/time-slots";
import { differenceInDays } from "date-fns";
import { getUsers } from "../app/repository";

const NOTIFICATION_TIME = "";

const startCron = (bot: Telegraf) => {
  cron.schedule("* * * * *", () => {
    const slots = getSlots();
    const now = new Date();

    console.log("slots", slots);
    const todaySlot = slots.find(
      (slot) => differenceInDays(slot.date, now) === 0
    );
    if (!todaySlot) {
      return;
    }

    console.log("todaySlot", todaySlot);

    if (todaySlot.assignee === undefined) {
      const users = getUsers();
      users.forEach((user) => {
        bot.telegram.sendMessage(
          user.telegramId,
          "Гав-гав! Погуляй со мной! Сегодня никто не хочет со мной гулять :'(, может ты сможешь? 🦮 Забронируй через /pick n"
        );
      });
      return;
    }

    bot.telegram.sendMessage(
      todaySlot.assignee.telegramId,
      "Гав-гав! Это напоминалка, погуляй со мной"
    );
  });
};

export { startCron };
