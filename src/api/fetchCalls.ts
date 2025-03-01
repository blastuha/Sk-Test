import { Call, CallFilterType, RawCall } from "@/models";
import { normalizeCalls } from "@/utils/normalizeCalls";
import { apiClient } from "./axiosInstance";

export interface CallResponse {
  total_rows: string;
  results: RawCall[];
}

export const fetchCalls = async (
  dateStart: string,
  dateEnd: string,
  inOut: CallFilterType
): Promise<Call[]> => {
  const response = await apiClient.post<CallResponse>("/getList", {
    date_start: dateStart,
    date_end: dateEnd,
    in_out: inOut,
  });

  // конвертируем ответ, чтобы использовать только нужные поля
  return normalizeCalls(response.data.results);
};
