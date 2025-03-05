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
    <ul className={styles["date-dropdown"]}>
      {options.map((option) => (
        <li
          key={option}
          className={`${styles["date-dropdown__option"]} ${
            currentValue === option
              ? styles["date-dropdown__option--active"]
              : ""
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </li>
      ))}
      <li className={styles["date-dropdown__custom-label"]}>
        <span>Указать даты</span>
      </li>
      <li
        className={styles["date-dropdown__custom-picker"]}
        onClick={() => onSelect("Указать даты")}
      >
        <span>__.__.__-__.__.__</span>
        <CalendarIcon className={styles["date-dropdown__icon"]} />
      </li>
    </ul>
  );
};

export default DateDropdown;
