import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle(`
html {
  background-color: #17252A;
}

body {
  color: #DEF2F1;
}

a {
  color: #3AAFA9;
  box-shadow: none;
  text-decoration: none;
}

a:hover {
  box-shadow: 0 1px 0 0 #3AAFA9;
}

blockquote {
  color: #FEFFFF;
}

.gatsby-resp-image-link:hover {
  box-shadow: none;
  text-decoration: none;
}
`)
