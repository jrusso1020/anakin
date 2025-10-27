import React from "react"
import { colors } from "../constants/colors"

interface OgImageTemplateProps {
  pageContext: {
    title: string
    date?: string
    description?: string
    timeToRead?: string
    tags?: string[]
  }
}

const OgImageTemplate = ({ pageContext }: OgImageTemplateProps) => {
  const { title, description, timeToRead, tags } = pageContext

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
          padding: "60px",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "900",
              margin: 0,
              lineHeight: 1.2,
              color: colors.light.foreground,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: description ? 2 : 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: "28px",
                color: colors.light.muted,
                margin: "20px 0 0 0",
                lineHeight: 1.4,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Bottom section with tags, read time, and site name */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {tags && tags.length > 0 && (
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#f5f5f5",
                      color: colors.light.primary,
                      border: `1px solid ${colors.light.border}`,
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "24px",
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {timeToRead && (
              <div
                style={{
                  fontSize: "20px",
                  color: "#a3a3a3",
                }}
              >
                {timeToRead} min read
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "900",
              color: colors.light.foreground,
              fontFamily: "Inter, system-ui, sans-serif",
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default OgImageTemplate
