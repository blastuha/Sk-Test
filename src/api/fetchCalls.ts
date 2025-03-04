import { CallFilterType, RawCall } from "@/models";
import { apiClient } from "./axiosInstance";

export interface CallResponse {
  total_rows: string;
  results: RawCall[];
}

export const fetchCalls = async (
  dateStart: string,
  dateEnd: string,
  inOut: CallFilterType = "",
  offset = 0
): Promise<RawCall[]> => {
  const response = await apiClient.post<CallResponse>(
    `/getList?date_start=${dateStart}&date_end=${dateEnd}&in_out=${inOut}&offset=${offset}`
  );
  return response.data.results;
};
