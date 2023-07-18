import React from "react"

import Sidebar from "./sidebar"
import MobileNavbar from "./mobileNavbar"

interface Props {
  location: Location
}

const Navbar = ({ location }: Props) => (
  <div>
    <Sidebar location={location} />
    <MobileNavbar location={location} />
  </div>
)

export default Navbar
