import React, { useState } from "react"
import { HamburgerIcon } from "../icons"
import NavLink from "./navLink"
import Bio from "./bio"

interface Props {
  location: Location
}

const MobileNavbar = ({ location }: Props) => {
  const [showNav, setShowNav] = useState(false)
  return (
    <div className="block md:hidden text-keppel">
      <nav className="pt-4 pb-4 bg-mirage h-14 fixed w-full z-10">
        <HamburgerIcon
          className="absolute top-3 right-0 mr-5"
          onClick={() => setShowNav(!showNav)}
        />
        {showNav && (
          <ul className="list-none ml-0 mb-0 mt-7 bg-mirage w-full">
            <li className="mb-0 p-5">
              <NavLink
                partiallyActive={
                  !["/about/"].includes(location.pathname) &&
                  !location.pathname.includes("tags")
                }
                to={"/"}
              >
                Blog
              </NavLink>
            </li>
            <li className="mb-0 p-5">
              <NavLink
                partiallyActive={location.pathname === "/about/"}
                to={"/about/"}
              >
                About
              </NavLink>
            </li>
            <li className="mb-0 p-5">
              <NavLink
                partiallyActive={location.pathname.includes("tags")}
                to={"/tags/"}
              >
                Tags
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
      <Bio />
    </div>
  )
}

export default MobileNavbar
