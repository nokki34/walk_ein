import { format } from "date-fns";
import { ru } from "date-fns/locale";

const formatDay = (date: Date) => format(date, "dd MMMM, EEEE", { locale: ru });

const randomFromArray = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export { formatDay, randomFromArray };
