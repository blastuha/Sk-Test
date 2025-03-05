import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterDate.module.scss";
import CalendarIcon from "@/components/ui/icons/CalendarIcon";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/ui/icons/ArrowRightIcon";
import DateDropdown from "./DateDropdown/DateDropdown";

interface FilterDateProps {
  onDateChange: (period: string) => void;
}

const FilterDate: React.FC<FilterDateProps> = ({ onDateChange }) => {
  // Текущее значение периода
  const [currentValue, setCurrentValue] = useState("3 дня");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (value: string) => {
    setCurrentValue(value);
    setIsOpen(false);
    // Вызываем callback для обновления параметров дат в API
    onDateChange(value);
  };

  return (
    <div className={styles["filter-date__container"]} ref={containerRef}>
      <div className={styles["filter-date"]}>
        <button className={styles["filter-date__arrow-button"]}>
          <ArrowLeftIcon className={styles["filter-date__icon"]} />
        </button>

        {/* При клике на центр (иконка + текст) открывается меню */}
        <div className={styles["filter-date__center"]} onClick={toggleDropdown}>
          <CalendarIcon className={styles["filter-date__calendar"]} />
          <span className={styles["filter-date__text"]}>{currentValue}</span>
        </div>

        <button className={styles["filter-date__arrow-button"]}>
          <ArrowRightIcon className={styles["filter-date__icon"]} />
        </button>
      </div>

      {/* Показываем дропдаун, если isOpen === true */}
      {isOpen && (
        <DateDropdown
          onSelect={handleSelectOption}
          currentValue={currentValue}
        />
      )}
    </div>
  );
};

export default FilterDate;
