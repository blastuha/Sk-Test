import { CallFilterType } from "@/models";

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

// Разрешённые предустановки для смены диапазона дат
export const ALLOWED_PRESETS = ["3 дня", "Неделя", "Месяц", "Год"];

// Опции фильтра звонков
export const FILTER_OPTIONS: { label: string; value: CallFilterType }[] = [
  { label: "Все звонки", value: "" },
  { label: "Входящие", value: "1" },
  { label: "Исходящие", value: "0" },
];

export const DATE_PRESETS = ["3 дня", "Неделя", "Месяц", "Год"];
