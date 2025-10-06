import React from "react"

interface OgImageDefaultProps {
  pageContext: {
    title?: string
    description?: string
  }
}

const OgImageDefault = ({ pageContext }: OgImageDefaultProps) => {
  const {
    title = "Bored Hacking",
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
            fontWeight: "bold",
            margin: 0,
            lineHeight: 1.2,
            color: "#667eea",
            marginBottom: "30px",
          }}
        >
          {title}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "36px",
            color: "#4a5568",
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
