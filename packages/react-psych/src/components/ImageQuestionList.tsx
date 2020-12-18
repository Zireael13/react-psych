import React from 'react'
import { ImageQuestionFields, TimelineNodeProps } from '../types'
import { createQuestionList } from '../utils/createImagePaths'
import { ImageQuestion } from './ImageQuestion'

interface QuestionListProps {
  experiment: string
  numQuestions: number
  correctResponses: number[]
  timeline?: TimelineNodeProps
}

export const ImageQuestionList: React.FC<QuestionListProps> = ({
  experiment,
  numQuestions,
  correctResponses,
}) => {
  const questionList = createQuestionList(
    experiment,
    numQuestions,
    correctResponses
  )
  return (
    <>
      {questionList.map((question) => {
        ;<ImageQuestion {...question} />
      })}
    </>
  )
}
