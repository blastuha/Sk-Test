import { useRef, useEffect, useState } from "react";
import CallsTable from "../CallsTable/CallsTable";
import { normalizeCalls } from "@/utils/normalizeCalls";
import { useGetCallsInfinite } from "@/hooks/useGetCalls";
import FilterBar from "../CallsTable/FilterBar/FilterBar";
import { CallFilterType } from "@/models/call/callFilterType";
import { getInitialDateRange } from "@/utils/getInitialDateRange";
import { convertCustomDate } from "@/utils/convertCustomDate";
import { Order, SortBy } from "@/constants";

const defaultPeriod = "3 дня";
const defaultRange = getInitialDateRange(defaultPeriod);

const CallsContainer = () => {
  const [inOut, setInOut] = useState<CallFilterType>("");
  const [dateRange, setDateRange] = useState({
    dateStart: defaultRange.dateStart,
    dateEnd: defaultRange.dateEnd,
  });
  const [sortBy, setSortBy] = useState<SortBy | undefined>(undefined);
  const [order, setOrder] = useState<Order | undefined>(undefined);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetCallsInfinite(
    dateRange.dateStart,
    dateRange.dateEnd,
    inOut,
    sortBy,
    order
  );

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allCalls = data?.pages.flatMap((page) => page.results) || [];

  const handleSelectType = (value: CallFilterType) => {
    setInOut(value);
  };

  const handleDateChange = (period: string) => {
    if (period.includes(" - ")) {
      if (period.includes(".")) {
        const [start, end] = period.split(" - ");
        setDateRange({
          dateStart: convertCustomDate(start.trim()),
          dateEnd: convertCustomDate(end.trim()),
        });
      } else {
        const [start, end] = period.split(" - ");
        setDateRange({
          dateStart: start.trim(),
          dateEnd: end.trim(),
        });
      }
    } else {
      const newRange = getInitialDateRange(period);
      setDateRange(newRange);
    }
  };

  const handleSortChange = (newSortBy: SortBy, newOrder: Order) => {
    setSortBy(newSortBy);
    setOrder(newOrder);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FilterBar
        selectedFilter={inOut}
        onSelectType={handleSelectType}
        onDateChange={handleDateChange}
      />

      <CallsTable
        calls={normalizeCalls(allCalls)}
        onSortChange={handleSortChange}
        isLoading={isLoading}
        isError={isError}
      />

      <div ref={loadMoreRef} style={{ height: "50px" }}>
        {isFetchingNextPage
          ? "Загрузка..."
          : hasNextPage
          ? "Загрузить ещё"
          : ""}
      </div>
    </div>
  );
};

export default CallsContainer;
