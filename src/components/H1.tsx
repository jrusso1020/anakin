import styled from "styled-components"

import { rhythm } from "src/utils/typography"
import { colors } from "src/utils/colors"

const H1 = styled.h1`
  margin-bottom: ${rhythm(1.5)};
  margin-top: 0;
  color: ${(props) => (props.color ? props.color : colors.mirage)};
`

export default H1
