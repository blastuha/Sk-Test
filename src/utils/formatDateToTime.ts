// для преобразования даты в формат "чч:мм"
export const formatDateToTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
