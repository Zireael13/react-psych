import { HStack, VStack, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TimelineNodeProps, defaultUserResponse } from '../types'
import { NextChakraImage } from '../util-components/NextChakraImage'

export type ImageResponse = {
  answerImage: string
}

export type ImageQuestionProps = TimelineNodeProps & {
  stimulus: string
  responses: ImageResponse[]
  correct: number
}

export const ImageQuestion: React.FC<ImageQuestionProps> = ({
  stimulus,
  responses,
  onFinish,
  index,
  isActive,
  correct,
}) => {
  const [responseStart, setResponseStart] = useState(Date.now())

  const handleResponseClick = (idx: number): void => {
    const responseEnd = Date.now()

    const responseTime = responseEnd - responseStart

    const isCorrect = idx === correct - 1

    if (
      index === undefined ||
      onFinish === undefined ||
      isActive === undefined
    ) {
      throw new Error(
        'timeline props not passed. Please put element inside a Timeline.'
      )
    }

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
  }, [])

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
