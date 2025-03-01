import { useQuery } from "@tanstack/react-query";
import { fetchCalls } from "@/api/fetchCalls";
import { CallFilterType } from "@/models";

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
