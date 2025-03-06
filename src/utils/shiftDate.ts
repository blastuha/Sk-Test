//  сдвигаем переданную дату на величину периода.
export const shiftDate = (
  dateStr: string,
  preset: string,
  direction: "left" | "right"
): string => {
  const date = new Date(dateStr);
  if (preset === "3 дня") {
    date.setDate(date.getDate() + (direction === "left" ? -3 : 3));
  } else if (preset === "Неделя") {
    date.setDate(date.getDate() + (direction === "left" ? -7 : 7));
  } else if (preset === "Месяц") {
    date.setMonth(date.getMonth() + (direction === "left" ? -1 : 1));
  } else if (preset === "Год") {
    date.setFullYear(date.getFullYear() + (direction === "left" ? -1 : 1));
  }
  return date.toISOString().slice(0, 10);
};
