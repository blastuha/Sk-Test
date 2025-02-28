import React from "react";
import styles from "./CallsTable.module.scss";
import { Call } from "@/models";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

const CallsTable = ({ calls }: { calls: Call[] }) => {
  if (calls.length === 0) {
    return <div>Звонков нет</div>;
  }

  return (
    <table className={styles["calls-table"]}>
      <TableHeader />
      <tbody className={styles["calls-table__body"]}>
        {calls.map((call) => (
          <TableRow call={call} />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(CallsTable);
// защищаем от лишнего ререндера
