import { hasExistingDb } from "./db";
import { getSlots, recoverState, saveSlots } from "./repository";
import { generateTimeSlots } from "./time-slots";

type WalkEinInitSettings = {
  fromDate: Date;
  toDate: Date;
};

const init = async (settings: WalkEinInitSettings) => {
  const shouldInit = !hasExistingDb();
  if (shouldInit) {
    const slots = generateTimeSlots(settings.fromDate, settings.toDate);
    await saveSlots(slots);
  } else {
    await recoverState();
  }
};

const test = async () => {
  const FROM = new Date();
  const TO = new Date(Date.now() + 3600 * 1000 * 24 * 14);
  const settings = { fromDate: FROM, toDate: TO };

  await init(settings);

  const slots = getSlots();
  console.log(slots);
};

export { test };
