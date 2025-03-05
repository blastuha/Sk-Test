import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import styles from "./DateDropdown.module.scss";
import CalendarIcon from "@/components/ui/icons/CalendarIcon";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import { dateValidation } from "@/utils/dateValidation";

interface DateDropdownProps {
  onSelect: (value: string) => void;
  currentValue: string;
}

const DateDropdown: React.FC<DateDropdownProps> = ({
  onSelect,
  currentValue,
}) => {
  const options = ["3 дня", "Неделя", "Месяц", "Год"];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApplyCustomDates = () => {
    // проверка на валидность даты
    if (!dateValidation(startDate) || !dateValidation(endDate)) {
      alert("Введите корректные даты");
      return;
    }
    onSelect(`${startDate} - ${endDate}`);
  };

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
      <li className={styles["date-dropdown__custom-picker"]}>
        <div>
          <IMaskInput
            mask="00.00.00"
            placeholder="__.__.__"
            value={startDate}
            unmask={false}
            onAccept={(value: string) => setStartDate(value)}
            className={styles["date-dropdown__input"]}
          />
          <span className={styles["date-dropdown__separator"]}>-</span>
          <IMaskInput
            mask="00.00.00"
            placeholder="__.__.__"
            value={endDate}
            unmask={false}
            onAccept={(value: string) => setEndDate(value)}
            className={styles["date-dropdown__input"]}
          />
        </div>

        <button
          onClick={handleApplyCustomDates}
          className={styles["date-dropdown__apply-button"]}
        >
          <IconWrapper width={16} height={16}>
            <CalendarIcon className={styles["date-dropdown__icon"]} />
          </IconWrapper>
        </button>
      </li>
    </ul>
  );
};

export default DateDropdown;
