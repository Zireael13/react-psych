import React from 'react'
import { TimelineNodeProps } from '../types'
import { createQuestionList } from '../utils/createImagePaths'
import { ImageQuestion } from './ImageQuestion'

interface QuestionListProps {
  experiment: string
  numQuestions: number
  correctResponses: number[]
  numResponses: number
  timeline?: TimelineNodeProps
}

export const ImageQuestionList: React.FC<QuestionListProps> = ({
  experiment,
  numQuestions,
  correctResponses,
  numResponses,
}) => {
  const questionList = createQuestionList(
    experiment,
    numQuestions,
    correctResponses,
    numResponses
  )
  return (
    <>
      {questionList.map((question) => {
        ;<ImageQuestion {...question} />
      })}
    </>
  )
}
