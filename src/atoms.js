import { atom } from "recoil";

export const minutesState = atom({
  key: "minutesState",
  default: 25,
});

export const secondsState = atom({
  key: "secondsState",
  default: 0,
});

export const roundState = atom({
  key: "roundState",
  default: 0,
});

export const goalState = atom({
  key: "goalState",
  default: 0,
});

export const isRunningState = atom({
  key: "isRunningState",
  default: false,
});
