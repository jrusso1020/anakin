import {
  CSSObject,
  ComponentSelector,
  Keyframes,
  SerializedStyles,
  css,
} from "@emotion/react"
import { ArrayCSSInterpolation } from "@emotion/serialize"

export const mobile = (
  inner:
    | string
    | number
    | boolean
    | ComponentSelector
    | Keyframes
    | SerializedStyles
    | CSSObject
    | ArrayCSSInterpolation
    | null
    | undefined
) => css`
  @media (max-width: ${800 / 16}em) {
    ${inner}
  }
`

export const phone = (
  inner:
    | string
    | number
    | boolean
    | ComponentSelector
    | Keyframes
    | SerializedStyles
    | CSSObject
    | ArrayCSSInterpolation
    | null
    | undefined
) => css`
  @media (max-width: ${650 / 16}em) {
    ${inner}
  }
`
