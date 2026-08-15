import React from "react"
import { colors } from "../constants/colors"

interface OgImageDefaultProps {
  pageContext: {
    title?: string
    description?: string
  }
}

const OgImageDefault = ({ pageContext }: OgImageDefaultProps) => {
  const {
    description = "Blog discussing software engineering, web development, technology, and life",
  } = pageContext

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: colors.light.background,
        padding: "80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: colors.light.card,
          border: `2px solid ${colors.light.border}`,
          borderRadius: "16px",
          padding: "80px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Site Title/Logo */}
        <h1
          style={{
            fontSize: "80px",
            fontWeight: "900",
            margin: 0,
            lineHeight: 1.2,
            color: colors.light.foreground,
            marginBottom: "30px",
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          <span style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
            Bored
          </span>{" "}
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              color: colors.light.primary,
            }}
          >
            &lt;Hacking/&gt;
          </span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "36px",
            color: colors.light.muted,
            margin: 0,
            lineHeight: 1.4,
            maxWidth: "900px",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default OgImageDefault
