import React from "react"
import { IconProps } from "./types"

export const HamburgerIcon: React.FC<IconProps> = ({
  className = "h-5 relative top-0 mr-2",
  ...props
}) => (
  <svg
    height="32px"
    width="32px"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
    />
  </svg>
)
