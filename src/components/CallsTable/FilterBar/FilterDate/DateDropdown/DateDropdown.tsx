import React from "react";
import styles from "./DateDropdown.module.scss";
import CalendarIcon from "@/components/ui/icons/CalendarIcon";

interface DateDropdownProps {
  onSelect: (value: string) => void;
  currentValue: string;
}

const DateDropdown: React.FC<DateDropdownProps> = ({
  onSelect,
  currentValue,
}) => {
  const options = ["3 дня", "Неделя", "Месяц", "Год"];

  return (
    <div className={styles["filter-date-dropdown"]}>
      {options.map((option) => (
        <div
          key={option}
          className={`${styles["filter-date-dropdown__item"]} ${
            currentValue === option
              ? styles["filter-date-dropdown__item--active"]
              : ""
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}

      <div
        className={styles["filter-date-dropdown__item"]}
        onClick={() => onSelect("Указать даты")}
      >
        Указать даты
        <CalendarIcon className={styles["filter-date-dropdown__calendar"]} />
      </div>
    </div>
  );
};

export default DateDropdown;
