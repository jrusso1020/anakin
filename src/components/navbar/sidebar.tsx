import React from "react"

import Bio from "./bio"
import DesktopNavbar from "./desktopNavbar"

interface Props {
  location: Location
}

const Sidebar = ({ location }: Props) => (
  <div className="hidden lg:block fixed top-8 left-8 w-80 z-50">
    <div className="space-y-6">
      <Bio />
      <DesktopNavbar location={location} />
    </div>
  </div>
)

export default Sidebar
