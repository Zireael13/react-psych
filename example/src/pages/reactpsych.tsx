import { Timeline, ImageQuestion, ImageQuestionProps } from '../react-psych'
import React from 'react'

interface reactpsychProps {}

const drtFilePath = '/react-psych/DRT/'

const createFilePath = (experiment=drtFilePath, questionNumber: number, fileName: string) => {
  const experimentPath = `/react-psych/${experiment}`
  const questionPath = `/question${questionNumber+1}`
  const filePath = `/${fileName}`
  return experimentPath + questionPath + filePath
}



const question1: ImageQuestionProps = {
  stimulus: drtFilePath + 'question1/stimulus.png',
  responses: [
    { answerImage: drtFilePath + 'question1/response1.png' },
    { answerImage: drtFilePath + 'question1/response2.png' },
    { answerImage: drtFilePath + 'question1/response3.png' },
    { answerImage: drtFilePath + 'question1/response4.png' },
  ],
  correct: 2,
}

const question2: ImageQuestionProps = {
  stimulus: drtFilePath + '/stimulus.png',
  responses: [
    { answerImage: drtFilePath + '/response1.png' },
    { answerImage: drtFilePath + '/response2.png' },
    { answerImage: drtFilePath + '/response3.png' },
    { answerImage: drtFilePath + '/response4.png' },
  ],
  correct: 2,
}

const reactpsych: React.FC<reactpsychProps> = () => {
  return (
    <Timeline>
      <ImageQuestion {...question1} />
      <ImageQuestion {}
    </Timeline>
  )
}

export default reactpsych
