import React, { useRef, useEffect, useState } from "react";
import CallsTable from "../CallsTable/CallsTable";
import { normalizeCalls } from "@/utils/normalizeCalls";
import { useGetCallsInfinite } from "@/hooks/useGetCalls";
import FilterBar from "../CallsTable/FilterBar/FilterBar";
import { CallFilterType } from "@/models/call/callFilterType";

const today = new Date().toISOString().slice(0, 10);
const startDate = "2025-03-02";

const CallsContainer = () => {
  const [inOut, setInOut] = useState<CallFilterType>("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetCallsInfinite(startDate, today, inOut);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FilterBar selectedFilter={inOut} onSelectType={handleSelectType} />

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
