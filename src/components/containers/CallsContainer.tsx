import React, { useRef, useEffect, useState } from "react";
import CallsTable from "../CallsTable/CallsTable";
import { normalizeCalls } from "@/utils/normalizeCalls";
import { useGetCallsInfinite } from "@/hooks/useGetCalls";
import FilterBar from "../CallsTable/FilterBar/FilterBar";
import { CallFilterType } from "@/models";

const today = new Date().toISOString().slice(0, 10);

const CallsContainer = () => {
  const [inOut, setInOut] = useState<CallFilterType>("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetCallsInfinite("2025-03-02", today, inOut);

  console.log("data", data);

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

  if (isLoading) return <div>Загрузка звонков...</div>;
  if (isError) return <div>Ошибка при получении звонков</div>;

  const allCalls = data?.pages.flatMap((page) => page.results) || [];

  const handleSelectType = (value: string) => {
    if (value === "Входящие") {
      setInOut("1");
    } else if (value === "Исходящие") {
      setInOut("0");
    } else {
      setInOut("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FilterBar onSelectType={handleSelectType} />

      <CallsTable calls={normalizeCalls(allCalls)} />
      <div ref={loadMoreRef} style={{ height: "50px" }}>
        {isFetchingNextPage ? "Загрузка..." : hasNextPage}
      </div>
    </div>
  );
};

export default CallsContainer;
