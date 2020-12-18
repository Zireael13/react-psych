import { HStack, Link, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  defaultUserResponse,
  ImageQuestionFields,
  TimelineNodeProps,
} from '../types'
import { NextChakraImage } from '../util-components/NextChakraImage'
import { TimelineNodeError } from '../utils/errors'

export type ImageQuestionProps = ImageQuestionFields & {
  timeline?: TimelineNodeProps
}

export const ImageQuestion: React.FC<ImageQuestionProps> = ({
  stimulus,
  responses,
  timeline,
  correct,
}) => {
  const [responseStart, setResponseStart] = useState(Date.now())

  if (!timeline) {
    throw new TimelineNodeError()
  }

  const handleResponseClick = (idx: number): void => {
    const responseEnd = Date.now()

    const responseTime = responseEnd - responseStart

    const isCorrect = idx === correct - 1

    const userResponse: defaultUserResponse = {
      node: timeline.index,
      response: idx,
      correct: isCorrect,
      time: responseTime,
    }
    timeline.onFinish(userResponse)
  }

  useEffect(() => {
    setResponseStart(Date.now())
  }, [timeline.isActive])

  if (!timeline.isActive) return null

  return (
    <VStack>
      <NextChakraImage src={stimulus} dimensions={[400, 400]} />
      <HStack spacing={15}>
        {responses.map((response, idx) => (
          <Link key={idx} onClick={() => handleResponseClick(idx)}>
            <NextChakraImage
              src={response.answerImage}
              dimensions={[200, 200]}
            />
          </Link>
        ))}
      </HStack>
    </VStack>
  )
}
