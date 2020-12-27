import styled from "styled-components"
import { Link } from "gatsby"
import { colors } from "src/utils/colors"

const NavLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  color: ${(props) => (props.color ? props.color : colors.keppel)};
  font-weight: ${(props) =>
    props.partiallyActive ? "bold" : props.fontWeight || 200};
  border-bottom: 2px solid
    ${(props) => (props.partiallyActive ? colors.swansDown : "transparent")};
`

export default NavLink
