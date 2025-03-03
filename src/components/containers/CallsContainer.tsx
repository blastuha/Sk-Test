import { useGetCalls } from "@/hooks/useGetCalls";
import CallsTable from "../CallsTable/CallsTable";

const today = new Date().toISOString().slice(0, 10);

const CallsContainer = () => {
  const {
    data: callsData,
    isLoading,
    isError,
  } = useGetCalls(today, "2024-02-27", "");

  console.log("data", callsData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading calls</div>;

  return <CallsTable calls={callsData || []} />;
};

export default CallsContainer;
