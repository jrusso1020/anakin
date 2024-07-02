import React from "react"

import Calendar from "content/assets/calendar.svg"
import Timer from "content/assets/timer.svg"

interface Props {
  date: string
  timeToRead: string
}

const BlogDateAndTime = ({ date, timeToRead }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative h-4 pr-1">
        <Calendar className="h-full" />
      </div>
      <span>{date}</span>
      <span>|</span>
      <div className="relative h-4 pr-1">
        <Timer className="h-full" />
      </div>
      <b>{timeToRead} min read</b>
    </div>
  )
}

export default BlogDateAndTime
