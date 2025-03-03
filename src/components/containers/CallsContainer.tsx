import { useGetCalls } from "@/hooks/useGetCalls";
import CallsTable from "../CallsTable/CallsTable";
import { normalizeCalls } from "@/utils/normalizeCalls";

const today = new Date().toISOString().slice(0, 10);

const CallsContainer = () => {
  const {
    data: callsData,
    isLoading,
    isError,
  } = useGetCalls("2024-02-27", today, "");

  console.log("data", callsData);

  if (isLoading) return <div>Загрузка звонков...</div>;
  if (isError) return <div>Ошбика при получении звонков</div>;

  return <CallsTable calls={normalizeCalls(callsData || [])} />;
};

export default CallsContainer;
