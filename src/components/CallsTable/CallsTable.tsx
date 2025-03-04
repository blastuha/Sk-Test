import React from "react";
import styles from "./CallsTable.module.scss";
import { Call } from "@/models";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";
import { format, isToday, isYesterday } from "date-fns";

// Группируем по ключу даты (но без учета времени).
type GroupedCalls = {
  [groupKey: string]: {
    label: string;
    items: Call[];
  };
};

interface CallsTableProps {
  calls: Call[];
}

const CallsTable: React.FC<CallsTableProps> = ({ calls }) => {
  if (calls.length === 0) {
    return <div>Звонков нет</div>;
  }

  //  Преобразуем string  в объект Date
  const callsWithDateObj = calls.map((call) => {
    const [dateStr, timeStr] = call.date.split(" ");
    const dateObj = new Date(`${dateStr}T${timeStr}`);
    return { ...call, dateObj };
  });

  const grouped: GroupedCalls = {};

  callsWithDateObj.forEach((item) => {
    const d = item.dateObj;
    let groupKey = format(d, "yyyy-MM-dd");
    let label = format(d, "dd.MM.yyyy");

    if (isToday(d)) {
      groupKey = "today";
      label = "Сегодня";
    } else if (isYesterday(d)) {
      groupKey = "yesterday";
      label = "Вчера";
    }

    if (!grouped[groupKey]) {
      grouped[groupKey] = { label, items: [] };
    }
    grouped[groupKey].items.push(item);
  });

  // Меняем объект grouped в массив для сортировки
  const sortedGroupKeys = Object.keys(grouped).sort((a, b) => {
    if (a === "today") return -1;
    if (b === "today") return 1;
    if (a === "yesterday" && b !== "today") return -1;
    if (b === "yesterday" && a !== "today") return 1;

    return b.localeCompare(a);
  });

  return (
    <div className={styles["calls-table-container"]}>
      <table className={styles["calls-table"]}>
        <TableHeader />
        <tbody className={styles["calls-table__body"]}>
          {sortedGroupKeys.map((groupKey) => {
            const group = grouped[groupKey];
            const items = group.items;
            const count = items.length;

            return (
              <React.Fragment key={groupKey}>
                <tr className={styles["calls-table__group-row"]}>
                  <td colSpan={7} className={styles["calls-table__group-cell"]}>
                    <span className={styles["calls-table__group-label"]}>
                      {group.label} {count}
                    </span>
                  </td>
                </tr>

                {items.map((call) => (
                  <TableRow key={call.id} call={call} />
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(CallsTable);
