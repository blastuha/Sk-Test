export interface Call {
  id: number;
  date: string;
  time: number;
  from_number: string;
  to_number: string;
  status: "Дозвонился" | "Не дозвонился";
  record?: string;
}
