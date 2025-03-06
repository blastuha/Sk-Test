// Определяем начальный диапазон дат для выбранного предустановленного периода
// для "3 дня" вернёт диапазон [today - 2 дня, сегодня] и тд

export const getInitialDateRange = (preset: string) => {
  const today = new Date();
  const start = new Date(today);
  if (preset === "3 дня") {
    start.setDate(start.getDate() - 2);
  } else if (preset === "Неделя") {
    start.setDate(start.getDate() - 6);
  } else if (preset === "Месяц") {
    start.setMonth(start.getMonth() - 1);
  } else if (preset === "Год") {
    start.setFullYear(start.getFullYear() - 1);
  }
  return {
    dateStart: start.toISOString().slice(0, 10),
    dateEnd: today.toISOString().slice(0, 10),
  };
};
