import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCalls } from "@/api/fetchCalls";
import { CallFilterType } from "@/models";

export const useGetCallsInfinite = (
  dateStart: string,
  dateEnd: string,
  inOut: CallFilterType
) => {
  return useInfiniteQuery({
    queryKey: ["calls", dateStart, dateEnd, inOut],
    queryFn: async ({ pageParam = 0 }) => {
      const results = await fetchCalls(dateStart, dateEnd, inOut, pageParam);
      return {
        results,
        nextOffset: pageParam + 50,
        isLastPage: results.length < 50,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.isLastPage ? undefined : lastPage.nextOffset,
    initialPageParam: 0,
  });
};
