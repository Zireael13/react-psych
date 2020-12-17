import { HStack, VStack, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  TimelineNodeProps,
  defaultUserResponse,
  ImageQuestionFields,
} from '../types'
import { NextChakraImage } from '../util-components/NextChakraImage'

export type ImageQuestionProps = TimelineNodeProps & ImageQuestionFields

export const ImageQuestion: React.FC<ImageQuestionProps> = ({
  stimulus,
  responses,
  onFinish,
  index,
  isActive,
  correct,
}) => {
  const [responseStart, setResponseStart] = useState(Date.now())

  if (index === undefined || onFinish === undefined || isActive === undefined) {
    throw new Error(
      'timeline props not passed. Please put element inside a Timeline.'
    )
  }
  const handleResponseClick = (idx: number): void => {
    const responseEnd = Date.now()

    const responseTime = responseEnd - responseStart

    const isCorrect = idx === correct - 1

    const userResponse: defaultUserResponse = {
      node: index,
      response: idx,
      correct: isCorrect,
      time: responseTime,
    }
    onFinish(userResponse)
  }

  useEffect(() => {
    setResponseStart(Date.now())
  }, [isActive])

  if (!isActive) return null

  return (
    <VStack>
      <NextChakraImage src={stimulus} dimensions={[400, 400]} />
      <HStack spacing={4}>
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
