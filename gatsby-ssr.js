import React from "react"
import { ThemeProvider } from "./src/components/theme-provider"

export const wrapRootElement = ({ element }) => (
  <ThemeProvider defaultTheme="light" storageKey="blog-theme">
    {element}
  </ThemeProvider>
) 