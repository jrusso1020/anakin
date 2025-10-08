import React from "react"
import { ThemeProvider } from "./src/components/theme-provider"

// custom typefaces
import "./src/styles/globals.css"
import "typeface-montserrat"
import "typeface-merriweather"
require("prismjs/themes/prism-tomorrow.css")

export const wrapRootElement = ({ element }) => (
  <ThemeProvider defaultTheme="light" storageKey="blog-theme">
    {element}
  </ThemeProvider>
)

export const onServiceWorkerUpdateReady = () => {
  window.location.reload()
}
