import React from "react"

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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "60px",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              margin: 0,
              lineHeight: 1.2,
              color: "#1a202c",
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
                color: "#4a5568",
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
                      backgroundColor: "#e2e8f0",
                      color: "#4a5568",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      fontSize: "24px",
                      fontWeight: 500,
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
                  color: "#718096",
                }}
              >
                {timeToRead} min read
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#667eea",
            }}
          >
            Bored Hacking
          </div>
        </div>
      </div>
    </div>
  )
}

export default OgImageTemplate
