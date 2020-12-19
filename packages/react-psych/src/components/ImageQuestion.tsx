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

  const handleResponse = (idx: number): void => {
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

  useEffect(() => {
    if (timeline.isActive && timeline.keyPressed) {
      const keyNum = parseInt(timeline.keyPressed)
      if (keyNum > 0 && keyNum <= responses.length) {
        handleResponse(keyNum - 1)
      }
    }
  }, [timeline.isActive, timeline.keyPressed, responses.length])

  return (
    <VStack spacing={10} display={timeline.isActive ? 'flex' : 'none'}>
      <NextChakraImage
        height="40vh"
        width="40vw"
        src={stimulus}
        quality={100}
        loading="eager"
        priority={true}
      />
      <HStack spacing={15}>
        {responses.map((response, idx) => (
          <Link
            bgColor="gray.50"
            borderWidth="1px"
            borderRadius="lg"
            p={2}
            _hover={{ boxShadow: 'outline' }}
            key={idx}
            onClick={() => handleResponse(idx)}
          >
            <VStack spacing={2} p={2}>
              <NextChakraImage
                height="15vh"
                width="15vw"
                src={response.answerImage}
                quality={100}
                loading="eager"
                priority={true}
              />
              <Text fontSize={20} fontWeight="600">
                {idx + 1}
              </Text>
            </VStack>
          </Link>
        ))}
      </HStack>
    </VStack>
  )
}
