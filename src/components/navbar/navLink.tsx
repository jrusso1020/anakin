import styled from "@emotion/styled"
import { Link } from "gatsby"
import { colors } from "src/utils/colors"

const NavLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  color: ${(props) => (props.color ? props.color : colors.keppel)};
  font-weight: ${(props) => (props.partiallyActive ? "bold" : 200)};
  border-bottom: 2px solid
    ${(props) => (props.partiallyActive ? colors.swansDown : "transparent")};
`

export default NavLink
