import React from "react";
import styles from "./FilterBar.module.scss";
import FilterDropdown from "./FilterDropdown/FilterDropdown";

interface FilterBarProps {
  onSelectType: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSelectType }) => {
  return (
    <div className={styles["calls-filter-bar"]}>
      <FilterDropdown
        label="Все типы"
        options={["Все типы", "Входящие", "Исходящие"]}
        onSelect={onSelectType}
      />
      <div className={styles["calls-filter-bar__right"]}>
        <button className={styles["calls-filter-bar__text"]}>3 дня</button>
      </div>
    </div>
  );
};

export default FilterBar;
