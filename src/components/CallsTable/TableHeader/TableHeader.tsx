import styles from "./TableHeader.module.scss";
import { CALLS_TABLE_HEADERS } from "@/constants";

const TableHeader = () => {
  return (
    <thead className={styles["table-header"]}>
      <tr className={styles["table-header__row"]}>
        {CALLS_TABLE_HEADERS.map((header) => (
          <th key={header} scope="col" className={styles["table-header__cell"]}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
