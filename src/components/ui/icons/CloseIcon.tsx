import React from "react";

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className = "",
  width = 14,
  height = 14,
  ...props
}) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      width={width}
      height={height}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CloseIcon;
