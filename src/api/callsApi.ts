import { Call } from "../models";
import { apiClient } from "./axiosInstance";

export interface CallResponse {
  total_rows: string;
  results: Call[];
}

export const fetchCalls = async (
  dateStart: string,
  dateEnd: string,
  inOut: 0 | 1 | ""
): Promise<CallResponse> => {
  const response = await apiClient.post<CallResponse>("/getList", {
    date_start: dateStart,
    date_end: dateEnd,
    in_out: inOut,
  });

  return response.data;
};
