import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { useKey } from 'react-keyboard-hooks'
import { getResponseTime, useResponseStart } from '../hooks/useResponseStart'
import { TimelineNodeProps } from '../types'
import { TimelineNodeError } from '../utils/errors'

interface TextScreen {
  timeline?: TimelineNodeProps
  buttonText: string
  inputKey?: string
}

export const TextScreen: React.FC<TextScreen> = ({
  children,
  timeline,
  buttonText,
  inputKey = ' ',
}) => {
  if (!timeline) {
    throw new TimelineNodeError()
  }

  useKey(inputKey, () => handleInput())

  const responseStart = useResponseStart(timeline.isActive)

  const handleInput = (): void => {
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
    <VStack>
      {children}
      <Button colorScheme="blue" onClick={handleInput}>
        {buttonText}
      </Button>
    </VStack>
  )
}
