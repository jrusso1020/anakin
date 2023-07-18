import { css } from "@emotion/react"

export const mobile = (inner) => css`
  @media (max-width: ${800 / 16}em) {
    ${inner}
  }
`

export const phone = (inner) => css`
  @media (max-width: ${650 / 16}em) {
    ${inner}
  }
`
