import React from "react"

const H1 = ({
  children,
  color,
}: {
  children: React.ReactNode
  color?: string
}) => (
  <h1
    className={`text-4xl font-bold mb-6 mt-0 text-${color ? color : "mirage"}`}
  >
    {children}
  </h1>
)

export default H1
