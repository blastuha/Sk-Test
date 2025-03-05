// проверка корректности строки в формате дд мм гг, возвращает true or false
export const dateValidation = (dateStr: string): boolean => {
  const datePattern = /^\d{2}\.\d{2}\.\d{2}$/;
  if (!datePattern.test(dateStr)) {
    return false;
  }

  const [dayStr, monthStr, yearStr] = dateStr.split(".");
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(`20${yearStr}`, 10);

  if (month < 1 || month > 12) {
    return false;
  }

  const dateObj = new Date(year, month - 1, day);
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
};
