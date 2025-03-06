import { useRef, useEffect, useState } from "react";
import CallsTable from "../CallsTable/CallsTable";
import { normalizeCalls } from "@/utils/normalizeCalls";
import { useGetCallsInfinite } from "@/hooks/useGetCalls";
import FilterBar from "../CallsTable/FilterBar/FilterBar";
import { CallFilterType } from "@/models/call/callFilterType";
import { getInitialDateRange } from "@/utils/getInitialDateRange";
import { convertCustomDate } from "@/utils/convertCustomDate";

const defaultPeriod = "3 дня";
const defaultRange = getInitialDateRange(defaultPeriod);

const CallsContainer = () => {
  const [inOut, setInOut] = useState<CallFilterType>("");

  const [dateRange, setDateRange] = useState({
    dateStart: defaultRange.dateStart,
    dateEnd: defaultRange.dateEnd,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetCallsInfinite(dateRange.dateStart, dateRange.dateEnd, inOut);

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
      // Если в строке есть точка, то формат ДД.ММ.ГГ
      if (period.includes(".")) {
        const [start, end] = period.split(" - ");
        setDateRange({
          dateStart: convertCustomDate(start.trim()),
          dateEnd: convertCustomDate(end.trim()),
        });
      } else {
        // если точки нет, то диапазон уже в формате ISO YYYY-MM-DD
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FilterBar
        selectedFilter={inOut}
        onSelectType={handleSelectType}
        onDateChange={handleDateChange}
      />

      {isLoading ? (
        <div>Загрузка звонков...</div>
      ) : isError ? (
        <div>Ошибка при получении звонков</div>
      ) : (
        <>
          <CallsTable calls={normalizeCalls(allCalls)} />
          <div ref={loadMoreRef} style={{ height: "50px" }}>
            {isFetchingNextPage
              ? "Загрузка..."
              : hasNextPage
              ? "Загрузить ещё"
              : ""}
          </div>
        </>
      )}
    </div>
  );
};

export default CallsContainer;
