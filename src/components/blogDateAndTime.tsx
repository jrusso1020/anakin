import React, { Fragment } from "react"
import styled from "@emotion/styled"

import Calendar from "content/assets/calendar.svg"
import Timer from "content/assets/timer.svg"
import { rhythm } from "src/utils/typography"

const CalendarSvg = styled(Calendar)`
  height: 1em;
  padding-right: ${rhythm(1 / 4)};
  top: 0.1em;
  position: relative;
`

const TimerSvg = styled(Timer)`
  height: 1em;
  padding-right: ${rhythm(1 / 4)};
  top: 0.125em;
  position: relative;
`

interface Props {
  date: string
  timeToRead: string
}

const BlogDateAndTime = ({ date, timeToRead }: Props) => {
  return (
    <Fragment>
      <CalendarSvg />
      {date} | <TimerSvg />
      <b>{timeToRead} min read</b>
    </Fragment>
  )
}

export default BlogDateAndTime
