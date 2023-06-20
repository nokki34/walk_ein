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
  storeState;
};

const saveSlot = async (slot: Timeslot) => {
  state = { ...state, slots: { ...state.slots, [slot.dateString]: slot } };
  storeState;
};

const getSlots = (): Timeslot[] => {
  return Object.values(state.slots);
};

// users
const addUser = async (user: User) => {
  state = { ...state, users: { ...state.users, [user.telegramId]: user } };
  storeState;
};

const getUsers = (): User[] => {
  return Object.values(state.users);
};

const recoverState = async () => {
  const db = await recoverDb();
  state = db;
};

const storeState = async () => {
  await storeDb(state);
};

export { getSlots, saveSlots, saveSlot, addUser, getUsers, recoverState };
