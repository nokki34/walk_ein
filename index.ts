import { configDotenv } from "dotenv";
import { init } from "./src/app";
import { createBot } from "./src/bot";

configDotenv();

const launchBot = createBot(process.env.TELEGRAM_TOKEN ?? "");

const start = async () => {
  const FROM = new Date();
  const TO = new Date(Date.now() + 3600 * 1000 * 24 * 14);
  const settings = { fromDate: FROM, toDate: TO };

  await init(settings);

  launchBot();
};

start();
