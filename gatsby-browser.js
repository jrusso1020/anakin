// custom typefaces
import "./src/styles/globals.css"
import "typeface-montserrat"
import "typeface-merriweather"
require("prismjs/themes/prism-tomorrow.css")

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}
