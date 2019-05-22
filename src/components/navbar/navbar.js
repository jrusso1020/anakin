import React from 'react'
import styled from 'styled-components'

import Sidebar from './sidebar'
import MobileNavbar from './mobileNavbar'

const Container = styled.div`

`

const Navbar = ({ location }) => (
  <Container>
    <Sidebar location={location} />
    <MobileNavbar location={location} />
  </Container>
)

export default Navbar
