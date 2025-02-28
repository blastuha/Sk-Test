import styles from "./CallsTable.module.scss";
import { CALLS_TABLE_HEADERS } from "@/constants";

const TableHeader = () => {
  return (
    <thead className={styles["calls-table__head"]}>
      <tr className={styles["calls-table__row"]}>
        {CALLS_TABLE_HEADERS.map((header) => (
          <th
            key={header}
            scope="col"
            className={styles["calls-table__header"]}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
