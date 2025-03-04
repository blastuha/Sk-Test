import { useRef, useEffect } from "react";
import CallsTable from "../CallsTable/CallsTable";
import { normalizeCalls } from "@/utils/normalizeCalls";
import { useGetCallsInfinite } from "@/hooks/useGetCalls";
import FilterBar from "../CallsTable/FilterBar/FilterBar";

const today = new Date().toISOString().slice(0, 10);

const CallsContainer = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetCallsInfinite("2025-03-02", today, "");

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FilterBar />
      <CallsTable calls={normalizeCalls(allCalls)} />
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
