import { useQuery } from "@tanstack/react-query";
import { fetchCalls } from "../api/callsApi";
import { CallType } from "../models/call/callType";

export const useGetCalls = (
  dateStart: string,
  dateEnd: string,
  inOut: CallType
) => {
  return useQuery({
    queryKey: ["calls", dateStart, dateEnd, inOut],
    queryFn: () => fetchCalls(dateStart, dateEnd, inOut),
  });
};
