import React from "react"
import styled from 'styled-components'

import { rhythm } from "../utils/typography"
import { colors } from '../utils/colors'
import Bio from "./bio"
import Navbar from './navbar'

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
`

const Sidebar = ({ location }) => (
  <Container>
    <Bio />
    <Navbar />
  </Container>
)

export default Sidebar
