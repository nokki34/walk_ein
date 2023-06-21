import { format } from "date-fns";
import { ru } from "date-fns/locale";

const formatDay = (date: Date) => format(date, "dd MMMM, EEEE", { locale: ru });

export { formatDay };
