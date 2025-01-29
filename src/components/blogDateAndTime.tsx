import React from "react"

import { CalendarIcon } from "./icons"
import { TimerIcon } from "./icons"

interface Props {
  date: string
  timeToRead: string
}

const BlogDateAndTime = ({ date, timeToRead }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative h-4 pr-1">
        <CalendarIcon className="h-full" />
      </div>
      <span>{date}</span>
      <span>|</span>
      <div className="relative h-4 pr-1">
        <TimerIcon className="h-full" />
      </div>
      <b>{timeToRead} min read</b>
    </div>
  )
}

export default BlogDateAndTime
