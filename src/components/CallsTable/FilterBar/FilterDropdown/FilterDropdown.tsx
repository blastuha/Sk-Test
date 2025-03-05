import React, { useState, useRef, useEffect } from "react";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import styles from "./FilterDropdown.module.scss";
import ArrowDownIcon from "@/components/ui/icons/ArrowDownIcon";
import ArrowTopIcon from "@/components/ui/icons/ArrowTopIcon";
import close from "@assets/icons/ui/close.svg";
import { CallFilterType } from "@/models/call/callFilterType";

interface Option {
  label: string;
  value: CallFilterType;
}

interface FilterDropdownProps {
  options: Option[];
  value: CallFilterType;
  onChange: (value: CallFilterType) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleReset = () => {
    onChange(options[0].value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles["calls-filter-bar__left-wrapper"]} ref={menuRef}>
      <button
        className={styles["calls-filter-bar__left"]}
        onClick={handleToggle}
      >
        <span
          className={`${styles["calls-filter-bar__text"]} ${
            value !== options[0].value
              ? styles["calls-filter-bar__text--active"]
              : ""
          }`}
        >
          {selectedOption.label}
        </span>
        <IconWrapper width={18} height={21}>
          {isOpen ? (
            <ArrowTopIcon
              width={10}
              height={6}
              className={styles["active-icon"]}
            />
          ) : (
            <ArrowDownIcon
              width={10}
              height={6}
              className={styles["down-icon"]}
            />
          )}
        </IconWrapper>
      </button>
      {isOpen && (
        <div className={styles["calls-filter-bar__menu"]}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={styles["calls-filter-bar__item"]}
              onClick={() => handleOptionClick(opt)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
      {value !== options[0].value && (
        <button
          className={styles["calls-filter-bar__reset"]}
          onClick={handleReset}
        >
          <span>Сбросить фильтры</span>
          <IconWrapper width={15} height={15}>
            <img src={close} alt="close" className={styles["close-icon"]} />
          </IconWrapper>
        </button>
      )}
    </div>
  );
};

export default FilterDropdown;
