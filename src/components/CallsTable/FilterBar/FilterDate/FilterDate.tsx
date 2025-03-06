import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterDate.module.scss";
import CalendarIcon from "@/components/ui/icons/CalendarIcon";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/ui/icons/ArrowRightIcon";
import DateDropdown from "./DateDropdown/DateDropdown";
import { getInitialDateRange } from "@/utils/getInitialDateRange";
import { shiftDate } from "@/utils/shiftDate";
import { ALLOWED_PRESETS } from "@/constants";

interface FilterDateProps {
  onDateChange: (period: string) => void;
}

const FilterDate: React.FC<FilterDateProps> = ({ onDateChange }) => {
  const [currentValue, setCurrentValue] = useState("3 дня");
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState(getInitialDateRange("3 дня"));
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (value: string) => {
    setCurrentValue(value);
    setIsOpen(false);
    if (ALLOWED_PRESETS.includes(value)) {
      const newRange = getInitialDateRange(value);
      setRange(newRange);
      onDateChange(`${newRange.dateStart} - ${newRange.dateEnd}`);
    } else {
      onDateChange(value);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleArrowLeft = () => {
    if (!ALLOWED_PRESETS.includes(currentValue)) {
      alert("Для смены диапазона выберите один из предустановленных значений.");
      return;
    }
    const newStart = shiftDate(range.dateStart, currentValue, "left");
    const newEnd = shiftDate(range.dateEnd, currentValue, "left");
    const newRange = { dateStart: newStart, dateEnd: newEnd };
    setRange(newRange);
    onDateChange(`${newRange.dateStart} - ${newRange.dateEnd}`);
  };

  const handleArrowRight = () => {
    if (!ALLOWED_PRESETS.includes(currentValue)) {
      alert("Для смены диапазона выберите один из предустановленных значений.");
      return;
    }
    const newStart = shiftDate(range.dateStart, currentValue, "right");
    const newEnd = shiftDate(range.dateEnd, currentValue, "right");
    if (new Date(newEnd) > new Date()) {
      alert("Нельзя выбрать дату позже сегодняшней");
      return;
    }
    const newRange = { dateStart: newStart, dateEnd: newEnd };
    setRange(newRange);
    onDateChange(`${newRange.dateStart} - ${newRange.dateEnd}`);
  };

  return (
    <div className={styles["filter-date__container"]} ref={containerRef}>
      <div className={styles["filter-date"]}>
        <button
          className={styles["filter-date__arrow-button"]}
          onClick={handleArrowLeft}
        >
          <ArrowLeftIcon className={styles["filter-date__icon"]} />
        </button>
        <div className={styles["filter-date__center"]} onClick={toggleDropdown}>
          <CalendarIcon className={styles["filter-date__calendar"]} />
          <span className={styles["filter-date__text"]}>{currentValue}</span>
        </div>
        <button
          className={styles["filter-date__arrow-button"]}
          onClick={handleArrowRight}
        >
          <ArrowRightIcon className={styles["filter-date__icon"]} />
        </button>
      </div>
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
