import React from "react";
import styles from "./CallsTable.module.scss";
import { Call } from "@/models";
import TableHeader from "./TableHeader/TableHeader";

const CallsTable = ({ calls }: { calls: Call[] }) => {
  if (calls.length === 0) {
    return <div>Звонков нет</div>;
  }

  return (
    <table className={styles["calls-table"]}>
      <TableHeader />
      <tbody className={styles["calls-table__body"]}>
        {calls.map((call) => (
          <tr key={call.id} className={styles["calls-table__row"]}>
            <td className={styles["calls-table__cell"]}>
              {call.in_out === 1 ? "Входящий" : "Исходящий"}
            </td>
            <td className={styles["calls-table__cell"]}>{call.date}</td>
            <td className={styles["calls-table__cell"]}>
              <div className={styles["calls-table__user"]}>
                <img
                  src={call.person_avatar}
                  alt={`Avatar of ${call.person_name} ${call.person_surname}`}
                  className={styles["calls-table__avatar"]}
                />
                <span className={styles["calls-table__name"]}>
                  {call.person_name} {call.person_surname}
                </span>
              </div>
            </td>
            <td className={styles["calls-table__cell"]}>{call.from_number}</td>
            <td className={styles["calls-table__cell"]}>
              {call.source || "Неизвестно"}
            </td>
            <td className={styles["calls-table__cell"]}>{call.status}</td>
            <td className={styles["calls-table__cell"]}>{call.time}s</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(CallsTable);
// защищаем от лишнего ререндера
