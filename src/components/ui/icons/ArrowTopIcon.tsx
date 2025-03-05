import React from "react";

const ArrowTopIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <path
        d="M6 0L0 6L1.41 7.41L6 2.83L10.59 7.41L12 6L6 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ArrowTopIcon;
