import React, { useState } from "react";
import styles from "./TableHeader.module.scss";
import { CALLS_TABLE_HEADERS, Order, SortBy } from "@/constants";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import ArrowDownIcon from "@/components/ui/icons/ArrowDownIcon";
import ArrowTopIcon from "@/components/ui/icons/ArrowTopIcon";

interface TableHeaderProps {
  onSortChange?: (sortBy: SortBy, order: Order) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ onSortChange }) => {
  const [sortDirections, setSortDirections] = useState<{
    [key: string]: "up" | "down";
  }>({
    Время: "down",
    Длительность: "down",
  });

  const handleHeaderClick = (headerCell: string) => {
    if (headerCell !== "Время" && headerCell !== "Длительность") return;

    const oldDirection = sortDirections[headerCell] || "down";
    const newDirection = oldDirection === "down" ? "up" : "down";

    setSortDirections((prev) => ({
      ...prev,
      [headerCell]: newDirection,
    }));

    const sortBy = headerCell === "Время" ? SortBy.Date : SortBy.Duration;
    const order = newDirection === "down" ? Order.Desc : Order.Asc;

    if (onSortChange) {
      onSortChange(sortBy, order);
    }
  };

  return (
    <thead className={styles["table-header"]}>
      <tr className={styles["table-header__row"]}>
        {CALLS_TABLE_HEADERS.map((headerCell) => {
          const isSortable =
            headerCell === "Время" || headerCell === "Длительность";
          const direction = sortDirections[headerCell];
          return (
            <th
              key={headerCell}
              scope="col"
              className={`
                ${styles["table-header__cell"]} 
                ${isSortable ? styles["has-icon"] : ""}
              `}
            >
              <span
                className={styles["table-header__text"]}
                onClick={() => handleHeaderClick(headerCell)}
              >
                {headerCell}
                {isSortable && (
                  <IconWrapper width={18} height={21}>
                    {direction === "down" ? (
                      <ArrowDownIcon
                        width={10}
                        height={6}
                        className={styles["table-header__icon"]}
                      />
                    ) : (
                      <ArrowTopIcon
                        width={10}
                        height={6}
                        style={{ color: "#005FF8" }}
                        className={styles["table-header__icon"]}
                      />
                    )}
                  </IconWrapper>
                )}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
