export const normalizePagePath = (pathname: string): string => {
  const normalizedPath = `/${pathname.replace(/^\/+|\/+$/g, "")}`

  return normalizedPath === "/" ? normalizedPath : `${normalizedPath}/`
}

export const pageUrl = (siteUrl: string, pathname: string): string =>
  `${siteUrl.replace(/\/+$/g, "")}${normalizePagePath(pathname)}`
