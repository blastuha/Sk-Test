import { useGetCalls } from "../../hooks/useGetCalls";
import CallsTable from "../CallsTable/CallsTable";

const CallsContainer = () => {
  const {
    data: callsData,
    isLoading,
    isError,
  } = useGetCalls("2024-02-01", "2024-02-28", "");

  console.log("data", callsData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading calls</div>;

  return <CallsTable calls={callsData || []} />;
};

export default CallsContainer;
