import { HStack, VStack, Link } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TimelineNodeProps, defaultUserResponse } from '../types'
import { NextChakraImage } from '../util-components/NextChakraImage'

export type ImageResponse = {
  answerImage: string
  correct?: boolean
}

export type ImageQuestionProps = TimelineNodeProps & {
  stimulus: string
  responses: ImageResponse[]
}

export const ImageQuestion: React.FC<ImageQuestionProps> = ({
  stimulus,
  responses,
  onFinish,
  index,
  isActive,
}) => {
  const [responseStart, setResponseStart] = useState(Date.now())

  if (!(onFinish && index && isActive)) {
    throw new Error(
      'timeline props not passed. Please put element inside a Timeline.'
    )
  }
  const handleResponseClick = (
    idx: number,
    isCorrect: boolean | undefined
  ): void => {
    const responseEnd = Date.now()

    const responseTime = responseEnd - responseStart

    if (!isCorrect) {
      isCorrect = false
    } else {
      isCorrect = true
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
          <Link
            key={idx}
            onClick={() => handleResponseClick(idx, response.correct)}
          >
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
