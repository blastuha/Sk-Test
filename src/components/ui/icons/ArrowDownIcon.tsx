import React from "react";

const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = "12",
  height = "8",
  className = "",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        opacity="0.8"
        d="M1.41 0.589966L6 5.16997L10.59 0.589966L12 1.99997L6 7.99997L0 1.99997L1.41 0.589966Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowDownIcon;
