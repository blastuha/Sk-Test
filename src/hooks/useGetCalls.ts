import { useQuery } from "@tanstack/react-query";
import { fetchCalls } from "../api/callsApi";
import { CallFilterType } from "../models/call/callFilterType";

export const useGetCalls = (
  dateStart: string,
  dateEnd: string,
  inOut: CallFilterType
) => {
  return useQuery({
    queryKey: ["calls", dateStart, dateEnd, inOut],
    queryFn: () => fetchCalls(dateStart, dateEnd, inOut),
  });
};
