import styles from "./TableHeader.module.scss";
import { CALLS_TABLE_HEADERS } from "@/constants";
import openDropdownArrow from "@/assets/icons/ui/openDropdownArrow.svg";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";

const TableHeader = () => {
  return (
    <thead className={styles["table-header"]}>
      <tr className={styles["table-header__row"]}>
        {CALLS_TABLE_HEADERS.map((headerCell) => (
          <th
            key={headerCell}
            scope="col"
            className={`
      ${styles["table-header__cell"]} 
      ${
        headerCell === "Длительность" || headerCell === "Время"
          ? styles["has-icon"]
          : ""
      }
    `}
          >
            <span className={styles["table-header__text"]}>
              {headerCell}
              {(headerCell === "Длительность" || headerCell === "Время") && (
                <IconWrapper width={18} height={21}>
                  <img
                    src={openDropdownArrow}
                    alt="Dropdown Arrow"
                    className={styles["table-header__icon"]}
                  />
                </IconWrapper>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
