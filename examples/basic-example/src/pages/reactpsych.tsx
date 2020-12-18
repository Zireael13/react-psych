import { Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import {
  createQuestionList,
  ImageQuestion,
  TextScreen,
  Timeline,
} from 'react-psych'

interface reactpsychProps {}

const questionList = createQuestionList(
  '/react-psych/DRT',
  12,
  [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
  4
)

const ReactPsych: React.FC<reactpsychProps> = () => {
  const router = useRouter()

  return (
    <Flex align="center" justify="center">
      <Flex shadow="md" align="center" justify="center" my={5}>
        <Timeline onFinish={() => router.push('/')} size="85">
          <TextScreen buttonText="begin">
            <Heading>Hello world</Heading>
          </TextScreen>
          {questionList.map((q, idx) => {
            return <ImageQuestion key={idx} {...q} />
          })}
          <TextScreen buttonText="finish">
            <Heading>Done!</Heading>
          </TextScreen>
        </Timeline>
      </Flex>
    </Flex>
  )
}

export default ReactPsych
