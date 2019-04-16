import styled from 'styled-components'
import { Link } from 'gatsby'
import { colors } from '../utils/colors'

const NavLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
  color: ${props => {
    console.log('color', props.color)
    return props.color ? props.color : colors.keppel
  }};
  font-weight: ${props => props.fontWeight || 200};
  &.active {
    font-weight: bold;
  }
`

export default NavLink
