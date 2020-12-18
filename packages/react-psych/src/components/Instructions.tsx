import { Button } from '@chakra-ui/react'
import React from 'react'
import { getResponseTime, useResponseStart } from '../hooks/useResponseStart'
import { TimelineNodeProps } from '../types'
import { TimelineNodeError } from '../utils/errors'

interface InstructionsProps {
  timeline?: TimelineNodeProps
  buttonText: string
}

const Instructions: React.FC<InstructionsProps> = ({
  children,
  timeline,
  buttonText,
}) => {
  if (!timeline) {
    throw new TimelineNodeError()
  }

  const responseStart = useResponseStart(timeline.isActive)

  const handleButtonClick = (): void => {
    const responseTime = getResponseTime(responseStart)
    timeline.onFinish({
      node: timeline.index,
      correct: null,
      response: buttonText,
      time: responseTime,
    })
  }

  if (!timeline.isActive) {
    return null
  }

  return (
    <>
      {children}
      <Button onClick={handleButtonClick}>{buttonText}</Button>
    </>
  )
}

export default Instructions
