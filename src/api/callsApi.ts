import { Call } from "../models";
import { apiClient } from "./axiosInstance";

export interface CallResponse {
  total_rows: string;
  results: any[]; // 👈 Указываем, что API возвращает "сырые" данные
}

export const fetchCalls = async (
  dateStart: string,
  dateEnd: string,
  inOut: 0 | 1 | ""
): Promise<Call[]> => {
  const response = await apiClient.post<CallResponse>("/getList", {
    date_start: dateStart,
    date_end: dateEnd,
    in_out: inOut,
  });

  // Нормализуем сразу здесь, чтобы в useGetCalls данные были чистыми
  return normalizeCalls(response.data.results);
};
