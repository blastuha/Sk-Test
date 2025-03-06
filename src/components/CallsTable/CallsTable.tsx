import React from "react";
import styles from "./CallsTable.module.scss";
import { Call } from "@/models";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";
import { format, isToday, isYesterday } from "date-fns";
import { ru } from "date-fns/locale";
import { Order, SortBy } from "@/constants";

type GroupedCalls = {
  [groupKey: string]: {
    label: string;
    items: Call[];
  };
};

interface CallsTableProps {
  calls: Call[];
  onSortChange?: (sortBy: SortBy, order: Order) => void;
  isLoading: boolean;
  isError: boolean;
}

const CallsTable: React.FC<CallsTableProps> = ({
  calls,
  onSortChange,
  isLoading,
  isError,
}) => {
  const grouped: GroupedCalls = {};
  if (!isLoading && !isError && calls.length > 0) {
    const callsWithDateObj = calls.map((call) => {
      const [dateStr, timeStr] = call.date.split(" ");
      const dateObj = new Date(`${dateStr}T${timeStr}`);
      return { ...call, dateObj };
    });

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
      } else {
        label = format(d, "d MMMM", { locale: ru });
      }

      if (!grouped[groupKey]) {
        grouped[groupKey] = { label, items: [] };
      }
      grouped[groupKey].items.push(item);
    });
  }

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
        <TableHeader onSortChange={onSortChange} />
        <tbody className={styles["calls-table__body"]}>
          {isLoading ? (
            <tr>
              <td colSpan={7} className={styles["loading-cell"]}>
                <div className={styles.spinner}></div>
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={7} className={styles["error-cell"]}>
                Ошибка при получении звонков
              </td>
            </tr>
          ) : calls.length === 0 ? (
            <tr>
              <td colSpan={7} className={styles["empty-cell"]}>
                Звонков нет
              </td>
            </tr>
          ) : (
            sortedGroupKeys.map((groupKey) => {
              const group = grouped[groupKey];
              const items = group.items;
              const count = items.length;
              return (
                <React.Fragment key={groupKey}>
                  {groupKey !== "today" && (
                    <tr className={styles["calls-table__group-row"]}>
                      <td
                        colSpan={7}
                        className={styles["calls-table__group-cell"]}
                      >
                        <div className={styles["calls-table__group-header"]}>
                          <span className={styles["calls-table__group-label"]}>
                            {group.label}
                          </span>
                          <span className={styles["calls-table__group-count"]}>
                            {count}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {items.map((call) => (
                    <TableRow key={call.id} call={call} />
                  ))}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(CallsTable);
