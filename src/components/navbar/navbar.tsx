import React from "react"
import styled from "styled-components"

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
