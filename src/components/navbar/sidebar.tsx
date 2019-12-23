import React from 'react'
import styled, { css }  from 'styled-components'

import { rhythm } from "src/utils/typography"
import { colors } from 'src/utils/colors'
import { mobile } from 'src/utils/media'
import Bio from './bio'
import DesktopNavbar from './desktopNavbar'

const Container = styled.div`
  color: ${colors.keppel};
  overflow-y: auto;
  height: calc(100vh);
  float: left;
  max-width: calc(300px - 1em);
  padding-left: ${rhythm(1)};
  padding-right: ${rhythm(1)};
  margin-right: ${rhythm(1)};
  position: fixed;
  padding-top: ${rhythm(2)};
  background-color: ${colors.mirage};
  ${mobile(css`
    display: none;
  `)}
`

interface Props {
  location: Location
}

const Sidebar = ({ location }: Props) => (
  <Container>
    <Bio />
    <DesktopNavbar location={location} />
  </Container>
)

export default Sidebar
