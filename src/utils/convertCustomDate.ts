// Функция для преобразования даты из формата "ДД.ММ.ГГ" в ISO "YYYY-MM-DD"
export const convertCustomDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split(".");
  return `20${year}-${month}-${day}`;
};
