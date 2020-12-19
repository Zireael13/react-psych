import { HStack, Link, Text, VStack } from '@chakra-ui/react'
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
    const keyDown = (e: KeyboardEvent): void => {
      const keyNum = parseInt(e.key)
      if (keyNum > 0 && keyNum <= responses.length) {
        handleResponseClick(keyNum - 1)
      }
    }

    if (timeline.isActive) {
      window.addEventListener('keydown', keyDown)
    }

    return () => {
      window.removeEventListener('keydown', keyDown)
    }
  }, [timeline.isActive])

  useEffect(() => {
    setResponseStart(Date.now())
  }, [timeline.isActive])

  if (!timeline.isActive) return null

  return (
    <VStack spacing={10}>
      <NextChakraImage
        height="40vh"
        width="40vw"
        src={stimulus}
        quality={100}
        loading="eager"
      />
      <HStack spacing={15}>
        {responses.map((response, idx) => (
          <Link
            boxShadow="sm"
            _hover={{ boxShadow: 'outline' }}
            key={idx}
            onClick={() => handleResponseClick(idx)}
          >
            <VStack spacing={2} p={2}>
              <NextChakraImage
                height="15vh"
                width="15vw"
                src={response.answerImage}
                quality={100}
                loading="eager"
              />
              <Text>{idx + 1}</Text>
            </VStack>
          </Link>
        ))}
      </HStack>
    </VStack>
  )
}
