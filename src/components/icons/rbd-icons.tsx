import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
} as const;

// ===== Process (7) =====

export function RbdProcessConsultation(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M5 6.5C5 5.11929 6.11929 4 7.5 4H16.5C17.8807 4 19 5.11929 19 6.5V12.5C19 13.8807 17.8807 15 16.5 15H11L7.2 18.2C6.55338 18.7443 5.57143 18.2847 5.57143 17.4396V15.0C4.70589 14.6602 4 13.7814 4 12.75V6.5C4 5.11929 5.11929 4 6.5 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9.5" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="12" cy="9.5" r="1" fill="#F87171" />
      <circle cx="15" cy="9.5" r="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export function RbdProcessPlanning(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M8 5.75C8 4.7835 8.7835 4 9.75 4H16.25C17.2165 4 18 4.7835 18 5.75V14.25C18 15.2165 17.2165 16 16.25 16H9.75C8.7835 16 8 15.2165 8 14.25V5.75Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 8H6C5.44772 8 5 8.44772 5 9V17C5 18.1046 5.89543 19 7 19H13C13.5523 19 14 18.5523 14 18V17.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 8H15.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10.5 11H13.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10 13.5L11.2 14.7L14.8 11.1"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RbdProcessDesign(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M12.25 4C7.69365 4 4 7.69365 4 12.25C4 15.4256 6.57436 18 9.75 18H11.25C12.2165 18 13 18.7835 13 19.75C13 20.4404 13.5596 21 14.25 21C17.9779 21 21 17.9779 21 14.25C21 8.58908 17.411 4 12.25 4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.25" cy="11" r="1.1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="11.75" cy="8.25" r="1.1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="15.5" cy="10.5" r="1.1" fill="#F87171" />
    </svg>
  );
}

export function RbdProcessDevelopment(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M8.5 8L5 12L8.5 16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 8L19 12L15.5 16"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 7V17"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M11.75 14.5H14.75"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RbdProcessTesting(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M9 4H15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10 4V8L5.75 15.0357C4.94462 16.3688 5.90489 18 7.46154 18H16.5385C18.0951 18 19.0554 16.3688 18.25 15.0357L14 8V4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 14L10.5 16.5L16 11"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RbdProcessLaunch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <g transform="translate(1 -0.5)">
        <path
          d="M13.5 4.75C16.2261 5.4206 18.5794 7.77394 19.25 10.5L14.25 15.5H9.75V11L13.5 4.75Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.75 12.25L15.75 7.25"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="15.25" cy="8.75" r="1.1" fill="currentColor" fillOpacity="0.3" />
        <path
          d="M9.75 15.5L7 18.25"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M8.25 16.75C7.61645 17.0875 7.00522 17.5354 6.46248 18.0782C5.54703 18.9936 5.16667 20.25 5.16667 20.25C5.16667 20.25 6.42303 19.8696 7.33848 18.9542C7.88122 18.4114 8.32913 17.8002 8.66667 17.1667"
          stroke="#F87171"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function RbdProcessMaintenance(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M6.5 12V10C6.5 6.96243 8.96243 4.5 12 4.5C15.0376 4.5 17.5 6.96243 17.5 10V12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M6.75 11.5H5.75C4.7835 11.5 4 12.2835 4 13.25V15.75C4 16.7165 4.7835 17.5 5.75 17.5H6.75C7.16421 17.5 7.5 17.1642 7.5 16.75V12.25C7.5 11.8358 7.16421 11.5 6.75 11.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.25 11.5H17.25C16.8358 11.5 16.5 11.8358 16.5 12.25V16.75C16.5 17.1642 16.8358 17.5 17.25 17.5H18.25C19.2165 17.5 20 16.7165 20 15.75V13.25C20 12.2835 19.2165 11.5 18.25 11.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14.5H10.5L11.5 12.5L12.5 16L13.5 14.5H15"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ===== Services (6) =====

export function RbdServiceWeb(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M4.75 12H19.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12 4.25C10.067 6.11519 9 8.90972 9 12C9 15.0903 10.067 17.8848 12 19.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12 4.25C13.933 6.11519 15 8.90972 15 12C15 15.0903 13.933 17.8848 12 19.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M6 8.75C7.66373 9.58333 9.66373 10 12 10C14.3363 10 16.3363 9.58333 18 8.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M6 15.25C7.66373 14.4167 9.66373 14 12 14C14.3363 14 16.3363 14.4167 18 15.25"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="16.75" cy="8.25" r="1" fill="#F87171" />
    </svg>
  );
}

export function RbdServiceApp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect
        x="7"
        y="3.75"
        width="10"
        height="16.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M10 6.75H14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <rect x="9" y="9" width="6" height="3" rx="1" fill="currentColor" fillOpacity="0.3" />
      <path
        d="M9.5 14.5H14.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.25" r="0.9" fill="#F87171" />
    </svg>
  );
}

export function RbdServiceBackend(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="5" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="5" y="10" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="5" y="15" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 7H11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 12H11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 17H11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="16" cy="7" r="1" fill="#F87171" />
      <circle cx="16" cy="12" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="16" cy="17" r="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

export function RbdServiceDatabase(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6.5" rx="6.5" ry="2.75" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5.5 6.5V17.5C5.5 19.019 8.41015 20.25 12 20.25C15.5899 20.25 18.5 19.019 18.5 17.5V6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M5.5 11.5C5.5 13.019 8.41015 14.25 12 14.25C15.5899 14.25 18.5 13.019 18.5 11.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M5.5 16.5C5.5 18.019 8.41015 19.25 12 19.25C15.5899 19.25 18.5 18.019 18.5 16.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M18.5 17.5H20.25"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RbdServiceCloud(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M7.5 18.5H17C18.933 18.5 20.5 16.933 20.5 15C20.5 13.2131 19.1614 11.7388 17.4302 11.524C16.9579 8.94639 14.7028 7 12 7C9.98108 7 8.19546 8.0866 7.22556 9.70653C4.91013 9.84895 3.25 11.6634 3.25 13.875C3.25 16.1532 5.09683 18 7.375 18H7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="8.25" y="11.75" width="7.5" height="4.5" rx="1" fill="currentColor" fillOpacity="0.3" />
      <path
        d="M10.5 14H13.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M15.75 14H18.25"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RbdServiceSolution(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M12 7.25C12.8072 7.25 13.473 6.6294 13.5446 5.82534L13.608 5.11298L14.9308 5.65162C15.6743 5.95434 16.5252 5.67195 16.9379 4.98537L17.6734 3.762L18.7879 4.8765L17.5646 5.61196C16.8781 6.02465 16.5957 6.87555 16.8984 7.61908L17.437 8.94186L16.7247 9.00528C15.9206 9.07693 15.3 9.74279 15.3 10.55V13.45C15.3 14.2572 15.9206 14.9231 16.7247 14.9947L17.437 15.0581L16.8984 16.3809C16.5957 17.1244 16.8781 17.9754 17.5646 18.388L18.7879 19.1235L17.6734 20.238L16.9379 19.0146C16.5252 18.328 15.6743 18.0457 14.9308 18.3484L13.608 18.887L13.5446 18.1747C13.473 17.3706 12.8072 16.75 12 16.75H9.1C8.29279 16.75 7.62693 17.3706 7.55528 18.1747L7.49186 18.887L6.16908 18.3484C5.42555 18.0457 4.57465 18.328 4.16196 19.0146L3.4265 20.238L2.312 19.1235L3.53537 18.388C4.22195 17.9754 4.50434 17.1244 4.20162 16.3809L3.66298 15.0581L4.37534 14.9947C5.1794 14.9231 5.8 14.2572 5.8 13.45V10.55C5.8 9.74279 5.1794 9.07693 4.37534 9.00528L3.66298 8.94186L4.20162 7.61908C4.50434 6.87555 4.22195 6.02465 3.53537 5.61196L2.312 4.8765L3.4265 3.762L4.16196 4.98537C4.57465 5.67195 5.42555 5.95434 6.16908 5.65162L7.49186 5.11298L7.55528 5.82534C7.62693 6.6294 8.29279 7.25 9.1 7.25H12Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M10.5 15.5C11.1667 16.1667 12.8333 16.1667 13.5 15.5"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ===== Values (6) =====

export function RbdValueStability(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M12 3.75L18.5 6.25V11.75C18.5 15.75 15.95 19.3456 12 20.5C8.05 19.3456 5.5 15.75 5.5 11.75V6.25L12 3.75Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13.5L10.75 10.5L13 13.5L15.5 10.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 13.5H15.5"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RbdValueScalability(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 18.5H19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M6 16L10 12V18.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12L14 8V18.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 8L18 4V18.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 4H18V5.75"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RbdValueCollaboration(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="16.5" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M9 9.5L10.75 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M15 9.5L13.25 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M9.75 15.25H14.25"
        stroke="#F87171"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RbdValueGoal(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.75" />
      <circle
        cx="12"
        cy="12"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeOpacity="0.45"
      />
      <circle cx="12" cy="12" r="1.5" fill="#F87171" />
    </svg>
  );
}

export function RbdValueExpertise(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M8.5 9L5.5 12L8.5 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9L18.5 12L15.5 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.5V16.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12 6L12.6176 7.2512L14 7.45154L13 8.42658L13.2361 9.80246L12 9.152L10.7639 9.80246L11 8.42658L10 7.45154L11.3824 7.2512L12 6Z"
        fill="#F87171"
      />
    </svg>
  );
}

export function RbdValueProcess(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <g transform="translate(-1.5 0)">
        <path
          d="M6 7L12 4L18 7L12 10L6 7Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M6 12L12 9L18 12L12 15L6 12Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M6 17L12 14L18 17L12 20L6 17Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 7.5V16.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M18.25 15.25L19.5 16.5L20.75 15.25"
          stroke="#F87171"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
