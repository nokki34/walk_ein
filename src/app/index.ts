import { hasExistingDb, initDb } from "./db";
import { getSlots, recoverState, saveSlots } from "./repository";
import { generateTimeSlots } from "./time-slots";

type WalkEinInitSettings = {
  fromDate: Date;
  toDate: Date;
};

const init = async (settings: WalkEinInitSettings) => {
  await initDb();
  const shouldInit = !(await hasExistingDb());
  if (shouldInit) {
    const slots = generateTimeSlots(settings.fromDate, settings.toDate);
    await saveSlots(slots);
  } else {
    await recoverState();
  }
};

export { init };
