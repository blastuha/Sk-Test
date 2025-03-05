import React from "react";
import styles from "./FilterBar.module.scss";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import { CallFilterType } from "@/models/call/callFilterType";

interface FilterBarProps {
  selectedFilter: CallFilterType;
  onSelectType: (value: CallFilterType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedFilter,
  onSelectType,
}) => {
  const filterOptions: { label: string; value: CallFilterType }[] = [
    { label: "Все звонки", value: "" },
    { label: "Входящие", value: "1" },
    { label: "Исходящие", value: "0" },
  ];

  return (
    <div className={styles["calls-filter-bar"]}>
      <FilterDropdown
        options={filterOptions}
        value={selectedFilter}
        onChange={onSelectType}
      />
      <div className={styles["calls-filter-bar__right"]}>
        <button className={styles["calls-filter-bar__text"]}>3 дня</button>
      </div>
    </div>
  );
};

export default FilterBar;
