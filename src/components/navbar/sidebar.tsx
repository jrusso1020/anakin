import React from "react"

import Bio from "./bio"
import DesktopNavbar from "./desktopNavbar"

interface Props {
  location: Location
}

const Sidebar = ({ location }: Props) => (
  <div className="text-keppel overflow-y-auto h-screen float-left max-w-xs pl-4 pr-4 mr-4 pt-8 bg-mirage fixed hidden md:block">
    <Bio />
    <DesktopNavbar location={location} />
  </div>
)

export default Sidebar
