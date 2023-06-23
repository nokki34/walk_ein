import { recoverDb, storeDb } from "./db";
import { Timeslot, User } from "../types";

type State = {
  slots: Record<string, Timeslot>; // datesting => Timeslot
  users: Record<string, User>; // tgId => User
};

let state: State = {
  slots: {},
  users: {},
};

// slots
const saveSlots = async (slots: Timeslot[]) => {
  slots.forEach((slot) => {
    state = { ...state, slots: { ...state.slots, [slot.dateString]: slot } };
  });
  await storeState();
};

const saveSlot = async (slot: Timeslot) => {
  state = { ...state, slots: { ...state.slots, [slot.dateString]: slot } };
  await storeState();
};

const getSlots = (): Timeslot[] => {
  return Object.values(state.slots);
};

// users
const addUser = async (user: User) => {
  state = { ...state, users: { ...state.users, [user.telegramId]: user } };
  await storeState();
};

const getUsers = (): User[] => {
  return Object.values(state.users);
};

const recoverState = async () => {
  const db: State = await recoverDb();
  Object.values(db.slots).reduce((acc: Record<string, Timeslot>, cur) => {
    cur.date = new Date(cur.date);
    acc[cur.dateString as string] = cur;
    return acc;
  }, {});
  state = db;
};

const storeState = async () => {
  await storeDb(state);
};

export { getSlots, saveSlots, saveSlot, addUser, getUsers, recoverState };
