import React from "react";
import styles from "./FilterBar.module.scss";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import { CallFilterType } from "@/models/call/callFilterType";
import FilterDate from "./FilterDate/FilterDate";

interface FilterBarProps {
  selectedFilter: CallFilterType;
  onSelectType: (value: CallFilterType) => void;
  onDateChange: (period: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedFilter,
  onSelectType,
  onDateChange,
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
      <FilterDate onDateChange={onDateChange} />
    </div>
  );
};

export default FilterBar;
