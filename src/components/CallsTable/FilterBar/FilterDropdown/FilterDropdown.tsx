import React, { useState, useRef, useEffect } from "react";
import IconWrapper from "@/components/containers/IconWrapper/IconWrapper";
import styles from "./FilterDropdown.module.scss";
import ArrowDownIcon from "@/components/ui/icons/ArrowDownIcon";
import ArrowTopIcon from "@/components/ui/icons/ArrowTopIcon";

interface FilterDropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
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
            selected !== "Все типы"
              ? styles["calls-filter-bar__text--active"]
              : ""
          }`}
        >
          {selected}
        </span>
        <IconWrapper width={18} height={21}>
          {isOpen ? (
            <ArrowTopIcon
              width={10}
              height={6}
              className={styles["active-icon"]}
              fill="#002CFB"
            />
          ) : (
            <ArrowDownIcon width={10} height={6} />
          )}
        </IconWrapper>
      </button>
      {isOpen && (
        <div className={styles["calls-filter-bar__menu"]}>
          {options.map((opt) => (
            <div
              key={opt}
              className={styles["calls-filter-bar__item"]}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
