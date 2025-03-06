import React from "react";
import styles from "./FilterBar.module.scss";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import { CallFilterType } from "@/models/call/callFilterType";
import FilterDate from "./FilterDate/FilterDate";
import { FILTER_OPTIONS } from "@/constants";

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
  return (
    <div className={styles["calls-filter-bar"]}>
      <FilterDropdown
        options={FILTER_OPTIONS}
        value={selectedFilter}
        onChange={onSelectType}
      />
      <FilterDate onDateChange={onDateChange} />
    </div>
  );
};

export default FilterBar;
