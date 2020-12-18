import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import {
  createQuestionList,
  ImageQuestion,
  ImageQuestionList,
  TextScreen,
  Timeline,
} from 'react-psych'

interface reactpsychProps {}

const questionList = createQuestionList('DRT', 12, [
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  4,
  1,
  2,
  3,
  4,
])

const ReactPsych: React.FC<reactpsychProps> = () => {
  const router = useRouter()

  return (
    <Timeline onFinish={() => router.push('/')}>
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
  )
}

export default ReactPsych
