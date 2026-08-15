import React from "react"

interface Props {
  date: string
  timeToRead: string
}

const BlogDateAndTime = ({ date, timeToRead }: Props) => (
  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
    <div className="flex items-center space-x-1">
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <time className="font-medium">{date}</time>
    </div>

    <div className="flex items-center space-x-1">
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="font-medium">{timeToRead} min read</span>
    </div>
  </div>
)

export default BlogDateAndTime
