'use client';

export const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className="mt-[8px] min-w-[60px] min-h-[60px]"
    >
      <defs>
        <linearGradient
          id="castora-sidebar-logo"
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
        fill="url(#castora-sidebar-logo)"
      />
      <path
        d="M38.49 21.51A12 12 0 1 0 38.49 38.49"
        stroke="#FFFFFF"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <circle cx="42" cy="30" r="3.5" fill="#FC69FF" />
    </svg>
  );
};
