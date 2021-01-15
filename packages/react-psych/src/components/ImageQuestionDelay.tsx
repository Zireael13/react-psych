import { Flex, HStack, Link, Text } from '@chakra-ui/react'
// import delay from 'delay'
import React, { useEffect, useState } from 'react'
import {
  defaultUserResponse,
  experimentElement,
  ImageQuestionFields,
  ImageResponse,
  questionState,
} from '../types'

interface ImageQuestionProps {
  questions: ImageQuestionFields[]
  setElement: (element: experimentElement) => void
}

export const ImageQuestion: React.FC<ImageQuestionProps> = ({
  questions,
  setElement,
}) => {
  const [questionElement, setQuestionElement] = useState<questionState>(
    'prompt'
  )
  const [responseStart, setResponseStart] = useState(Date.now())
  //const [loading, setLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<defaultUserResponse[]>([])

  const handleResponseClick = async (response: number): Promise<void> => {
    const answerTime = Date.now()
    setQuestionElement(null)
    //setLoading(true)

    const interval = answerTime - responseStart
    console.log(interval)
    console.log(response)

    const isCorrect = questions[currentQuestion].correct === response + 1

    const newResponses = [
      ...responses,
      {
        node: currentQuestion,
        response,
        correct: isCorrect,
        time: interval,
      },
    ]
    setResponses(newResponses)

    if (currentQuestion === questions.length - 1) {
      console.log('last question')

      console.log('submitting responses: ', newResponses)

      setElement('finish')
    } else {
      setCurrentQuestion(currentQuestion + 1)
      //setLoading(false)
      setQuestionElement('prompt')
    }
  }

  useEffect(() => {
    if (questionElement === 'responses') {
      setResponseStart(Date.now())
    }
  }, [questionElement, setResponseStart])

  useEffect(() => {
    if (questionElement === 'prompt') {
      const waitThenShowAnswers = async (time: number): Promise<void> => {
        // await delay(time)
        console.log(time)
        setQuestionElement('responses')
      }
      waitThenShowAnswers(5000)
    }
  }, [questionElement, setQuestionElement])

  let body = <Text>loading...</Text>

  if (questionElement === 'prompt') {
    body = <Text>loading...</Text>
  } else if (questionElement === 'responses') {
    body = (
      <HStack spacing={4}>
        {questions[currentQuestion].responses.map(
          (option: ImageResponse, idx: number) => (
            <Link key={idx} onClick={() => handleResponseClick(idx)}>
              {option.answerImage}
            </Link>
          )
        )}
      </HStack>
    )
  }

  return <Flex mt={6}>{body}</Flex>
}
