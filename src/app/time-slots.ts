import * as repo from "./repository";
import { Timeslot, User } from "../types";

const addAssignee = (slot: Timeslot, assignee: User) => {
  slot.assignee = assignee;
  repo.saveSlot(slot);
};

const removeAssignee = (slot: Timeslot) => {
  slot.assignee = undefined;
  repo.saveSlot(slot);
};

const getSlots = () => {
  return repo.getSlots();
};

const generateTimeSlots = (fromDate: Date, toDate: Date): Timeslot[] => {
  const INTERVAL = 1000 * 60 * 60 * 24; // 1 day
  const days: Date[] = [];
  let temp = fromDate;
  while (toDate >= temp) {
    days.push(temp);
    temp = new Date(temp.getTime() + INTERVAL);
  }
  return days.map((it) => ({
    date: it,
    dateString: it.toISOString(),
  }));
};

export { addAssignee, removeAssignee, getSlots, generateTimeSlots };
