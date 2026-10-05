import React from 'react';

export const LogoTextComponent = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <svg
        width="33"
        height="33"
        viewBox="6 6 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="castora-text-logo"
            x1="6"
            y1="6"
            x2="54"
            y2="54"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7B3DFF" />
            <stop offset="1" stopColor="#612BD3" />
          </linearGradient>
        </defs>
        <rect
          x="6"
          y="6"
          width="48"
          height="48"
          rx="14"
          fill="url(#castora-text-logo)"
        />
        <path
          d="M38.49 21.51A12 12 0 1 0 38.49 38.49"
          stroke="#FFFFFF"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <circle cx="42" cy="30" r="3.5" fill="#FC69FF" />
      </svg>
      <span className="text-[24px] font-[600] tracking-[-0.5px] text-white">
        Castora
      </span>
    </div>
  );
};
