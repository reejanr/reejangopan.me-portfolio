type P = { size?: number; className?: string };

const base = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true,
});

export const ArrowUpRight = ({ size = 16, className = "ic-arrow" }: P) => (
  <svg {...base(size)} className={className}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
);
export const ArrowRight = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></svg>
);
export const ArrowUp = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></svg>
);
export const Download = ({ size = 16, className = "ic-down" }: P) => (
  <svg {...base(size)} className={className}><path d="M12 4v12" /><path d="M6 11l6 6 6-6" /><path d="M5 20h14" /></svg>
);
export const Check = ({ size = 16, className }: P) => (
  <svg {...base(size)} strokeWidth={2.4} className={className}><path d="M20 6L9 17l-5-5" /></svg>
);
export const Sun = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const Moon = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
);
export const Menu = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Close = ({ size = 20, className }: P) => (
  <svg {...base(size)} className={className}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
