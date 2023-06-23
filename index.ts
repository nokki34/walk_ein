import { configDotenv } from "dotenv";
import { init } from "./src/app";
import { createBot } from "./src/bot";

configDotenv();

const launchBot = createBot(process.env.TELEGRAM_TOKEN ?? "");

const start = async () => {
  const FROM = new Date();
  const TO = new Date(Date.parse("2023-06-10T14:12:27.117Z"));
  const settings = { fromDate: FROM, toDate: TO };

  await init(settings);

  launchBot();
};

start();
