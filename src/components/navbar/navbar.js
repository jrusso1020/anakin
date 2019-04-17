import React from 'react'
import styled from 'styled-components'

import Sidebar from './sidebar'
import MobileNavbar from './mobileNavbar'

const Container = styled.div`

`

const Navbar = ({ location }) => (
  <Container>
    <Sidebar />
    <MobileNavbar />
  </Container>
)

export default Navbar
