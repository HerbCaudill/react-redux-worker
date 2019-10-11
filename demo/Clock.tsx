import React, { useState } from 'react'
import ReactCountdownClock from 'react-countdown-clock'

export const Clock = () => {
  const [time, setTime] = useState(3)
  const [seconds, setSeconds] = useState(time)

  const restart = () => {
    // can't just set seconds back to the starting value, or it won't restart
    const t = time + 0.00000000001
    setTime(t)
    setSeconds(t)
  }

  return (
    <ReactCountdownClock
      seconds={seconds}
      color="#008080"
      timeFormat="seconds"
      weight={20}
      size={200}
      onComplete={restart}
    />
  )
}
