import React from "react";
import styles from "./FilterBar.module.scss";
import FilterDropdown from "@/components/ui/FilterDropdown/FilterDropdown";

const FilterBar = () => {
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <div className={styles["calls-filter-bar"]}>
      <FilterDropdown
        label="Все типы"
        options={["Все типы", "Входящие", "Исходящие"]}
        onSelect={handleSelect}
      />
      <div className={styles["calls-filter-bar__right"]}>
        <button className={styles["calls-filter-bar__text"]}>3 дня</button>
      </div>
    </div>
  );
};

export default FilterBar;
