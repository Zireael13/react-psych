import { ImageResponse, ImageQuestionFields } from '../types'

const drtFilePath = '/react-psych/DRT/'

const createStimulusPath = (questionPath: string): string => {
  return questionPath + '/stimulus.png'
}

const createQuestionPath = (
  experimentPath = drtFilePath,
  questionNumber: number
): string => {
  const questionPath = `/question${questionNumber}`
  return experimentPath + questionPath
}

const createResponseArray = (
  questionPath: string,
  numResponses = 4
): ImageResponse[] => {
  const arr: ImageResponse[] = []
  for (let i = 0; i < numResponses; i++) {
    arr.push({ answerImage: questionPath + `/response${i + 1}.png` })
  }
  return arr
}

const createQuestion = (
  experiment: string,
  questionNumber: number,
  correct: number,
  numResponses: number
): ImageQuestionFields => {
  const questionPath = createQuestionPath(experiment, questionNumber)
  return {
    stimulus: createStimulusPath(questionPath),
    responses: createResponseArray(questionPath, numResponses),
    correct,
  }
}

export const createQuestionList = (
  experiment: string,
  numQuestions: number,
  correctResponses: number[],
  numResponses: number
): ImageQuestionFields[] => {
  if (correctResponses.length !== numQuestions) {
    throw new Error(
      `${experiment} questions and correct responses are not of the same length.`
    )
  }

  const questionList: ImageQuestionFields[] = []

  for (let i = 0; i < numQuestions; i++) {
    questionList.push(
      createQuestion(experiment, i + 1, correctResponses[i], numResponses)
    )
  }
  return questionList
}
