import styles from "./TableHeader.module.scss";
import { CALLS_TABLE_HEADERS } from "@/constants";
import openDropdownArrow from "@/assets/icons/ui/openDropdownArrow.svg";

const TableHeader = () => {
  return (
    <thead className={styles["table-header"]}>
      <tr className={styles["table-header__row"]}>
        {CALLS_TABLE_HEADERS.map((header) => (
          <th key={header} scope="col" className={styles["table-header__cell"]}>
            <span className={styles["table-header__text"]}>
              {header}
              {header === "Длительность" && (
                <img
                  src={openDropdownArrow}
                  alt="Dropdown Arrow"
                  className={styles["table-header__icon"]}
                />
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
