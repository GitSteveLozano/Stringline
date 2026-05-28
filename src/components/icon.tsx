import * as React from "react";

/**
 * V2 icon set — stroke-based, 24×24, currentColor.
 * Ported from the inline SVGs in designs/v2. Add glyphs as screens need them.
 */
export type IconName =
  | "home"
  | "projects"
  | "money"
  | "team"
  | "more"
  | "today"
  | "crew"
  | "field"
  | "log"
  | "time"
  | "scope"
  | "hours"
  | "queue"
  | "clients"
  | "library"
  | "plus"
  | "chevron"
  | "back"
  | "bell"
  | "pin"
  | "check"
  | "x"
  | "camera";

const PATHS: Record<IconName, React.ReactNode> = {
  home: <path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7H10v7H6a2 2 0 01-2-2v-9z" />,
  projects: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="1" />
      <path d="M3 10h18M9 6V4h6v2" />
    </>
  ),
  money: <path d="M12 3v18M16 7H9.5a2.5 2.5 0 000 5h5a2.5 2.5 0 010 5H7" />,
  team: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19a6 6 0 0112 0M15 19a4 4 0 016-3.4" />
    </>
  ),
  more: (
    <>
      <rect x="4" y="4" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
    </>
  ),
  today: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  crew: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 19a6 6 0 0112 0M15 19a4 4 0 016-3.4" />
    </>
  ),
  field: <path d="M12 3l10 18H2L12 3zM12 10v5M12 18v.01" />,
  log: (
    <>
      <path d="M14 3H6v18h12V7l-4-4zM14 3v4h4" />
      <path d="M9 12h6M9 16h4" />
    </>
  ),
  time: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  scope: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  hours: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  queue: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5M3 18l9 5 9-5" />
    </>
  ),
  clients: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0116 0" />
    </>
  ),
  library: <path d="M4 5h12a2 2 0 012 2v13H6a2 2 0 01-2-2V5zM4 5a2 2 0 002 2h12M9 9h6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  chevron: <path d="M9 6l6 6-6 6" />,
  back: <path d="M15 18l-6-6 6-6" />,
  bell: <path d="M6 16V11a6 6 0 1112 0v5l1.5 2.5h-15L6 16zM10 21h4" />,
  pin: (
    <>
      <path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z" />
      <circle cx="12" cy="9" r="3" />
    </>
  ),
  check: <path d="M5 12l5 5L20 7" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  camera: (
    <>
      <path d="M3 7h4l2-3h6l2 3h4v13H3V7z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
};

export function Icon({
  name,
  size = 22,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
