// Верхние ячейки таблицы
export const CALLS_TABLE_HEADERS = [
  "Тип",
  "Время",
  "Сотрудник",
  "Звонок",
  "Источник",
  "Оценка",
  "Длительность",
];

// Тип звонка входящий, исходящий
export enum InOutCallType {
  Incoming = 1,
  Outgoing = 0,
}

export enum CallStatus {
  Connected = "Дозвонился",
  Missed = "Пропущенный",
  Failed = "Недозвон",
}
