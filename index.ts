import { init } from "./src/app";
import { createBot } from "./src/bot";
const launchBot = createBot("6067807749:AAFBsJSMgpKTYKHc7ZR9Q7dNoHAH-4P0hgY");

const start = async () => {
  const FROM = new Date();
  const TO = new Date(Date.now() + 3600 * 1000 * 24 * 14);
  const settings = { fromDate: FROM, toDate: TO };

  await init(settings);
  launchBot();
};

start();
