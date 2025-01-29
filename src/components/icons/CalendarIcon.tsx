import React from "react"
import { IconProps } from "./types"

export const CalendarIcon: React.FC<IconProps> = ({
  className = "h-5 relative top-0 mr-2",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="1" y="3" width="22" height="20" rx="3" ry="3" />
    <line x1="1" y1="9" x2="23" y2="9" />
    <line x1="12" y1="5" x2="12" y2="1" />
    <line x1="6" y1="5" x2="6" y2="1" />
    <line x1="18" y1="5" x2="18" y2="1" />
    <line x1="5" y1="14" x2="7" y2="14" />
    <line x1="11" y1="14" x2="13" y2="14" />
    <line x1="17" y1="14" x2="19" y2="14" />
    <line x1="5" y1="18" x2="7" y2="18" />
    <line x1="11" y1="18" x2="13" y2="18" />
    <line x1="17" y1="18" x2="19" y2="18" />
  </svg>
)
