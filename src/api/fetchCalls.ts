import { CallFilterType, RawCall } from "@/models";
import { apiClient } from "./axiosInstance";
import { Order, SortBy } from "@/constants";

export interface CallResponse {
  total_rows: string;
  results: RawCall[];
}

export const fetchCalls = async (
  dateStart: string,
  dateEnd: string,
  inOut: CallFilterType = "",
  offset = 0,
  sortBy?: SortBy,
  order?: Order
): Promise<RawCall[]> => {
  const params = new URLSearchParams({
    date_start: dateStart,
    date_end: dateEnd,
    offset: offset.toString(),
  });

  if (inOut !== "") {
    params.append("in_out", inOut);
  }
  if (sortBy) {
    params.append("sort_by", sortBy);
  }
  if (order) {
    params.append("order", order);
  }

  const response = await apiClient.post<CallResponse>(
    `/getList?${params.toString()}`
  );
  return response.data.results;
};
