interface IconProps {
  className?: string;
}

const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowUpRight = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
  </svg>
);

export const ArrowRight = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
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

export const CheckIcon = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="m3.5 8.5 3 3 6-7" />
  </svg>
);

export const MailIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="2" />
    <path d="m2.5 4.5 5.5 4 5.5-4" />
  </svg>
);

export const ChatIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M2.5 13.5l1-3a5.5 5.5 0 1 1 2 2z" />
  </svg>
);

export const InstagramIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="2" y="2" width="12" height="12" rx="3.5" />
    <circle cx="8" cy="8" r="2.75" />
    <circle cx="11.6" cy="4.4" r="0.4" fill="currentColor" />
  </svg>
);

export const LinkedInIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="2" y="2" width="12" height="12" rx="2.5" />
    <path d="M5 7v4M5 5v.01M8 11V7M8 8.75c0-1 .75-1.75 1.75-1.75S11 7.75 11 8.75V11" />
  </svg>
);
