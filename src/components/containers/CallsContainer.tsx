import { useRef, useEffect, useState } from "react";
import CallsTable from "../CallsTable/CallsTable";
import { normalizeCalls } from "@/utils/normalizeCalls";
import { useGetCallsInfinite } from "@/hooks/useGetCalls";
import FilterBar from "../CallsTable/FilterBar/FilterBar";
import { CallFilterType } from "@/models/call/callFilterType";

const today = new Date();
const formattedToday = today.toISOString().slice(0, 10);

// Функция для вычисления даты начала в зависимости от выбранного периода
const calculateStartDate = (period: string): string => {
  const date = new Date();
  switch (period) {
    case "3 дня":
      date.setDate(date.getDate() - 2); // включая сегодня: получаем 3 дня
      break;
    case "Неделя":
      date.setDate(date.getDate() - 6);
      break;
    case "Месяц":
      date.setMonth(date.getMonth() - 1);
      break;
    case "Год":
      date.setFullYear(date.getFullYear() - 1);
      break;
    default:
      // Если выбрано "Указать даты" или неизвестный период,
      // можно оставить дефолтное значение или реализовать отдельную логику
      break;
  }
  return date.toISOString().slice(0, 10);
};

// Функция для преобразования даты из формата "ДД.ММ.ГГ" в "YYYY-MM-DD"
const convertCustomDate = (dateStr: string): string => {
  const [day, month, year] = dateStr.split(".");
  return `20${year}-${month}-${day}`;
};

const defaultPeriod = "3 дня";
const defaultStartDate = calculateStartDate(defaultPeriod);

const CallsContainer = () => {
  const [inOut, setInOut] = useState<CallFilterType>("");
  const [dateRange, setDateRange] = useState({
    dateStart: defaultStartDate,
    dateEnd: formattedToday,
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

  // Обновлённая функция для смены периода дат
  const handleDateChange = (period: string) => {
    if (period.includes(" - ")) {
      // Если выбран пользовательский диапазон дат
      const [start, end] = period.split(" - ");
      setDateRange({
        dateStart: convertCustomDate(start.trim()),
        dateEnd: convertCustomDate(end.trim()),
      });
    } else {
      // Для предустановленных периодов
      const newStartDate = calculateStartDate(period);
      setDateRange({ dateStart: newStartDate, dateEnd: formattedToday });
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
