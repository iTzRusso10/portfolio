interface IconProps {
  className?: string;
}

const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "square" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowUpRight = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

export const ArrowDown = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
  </svg>
);

export const ArrowUp = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 13.5v-11M3.5 7 8 2.5 12.5 7" />
  </svg>
);

export const CopyIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5.5 5.5h8v8h-8zM10.5 5.5v-3h-8v8h3" />
  </svg>
);
