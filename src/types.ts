export type TextAnswer = {
  answerText: string
}

export type TextQuestionType = {
  prompt: string
  answers: TextAnswer[]
  correct: number
}

export type ImageResponse = {
  answerImage: string
}

export type ImageQuestionType = {
  prompt: string
  responses: ImageResponse[]
  correct: number
}

export type experimentElement = 'question' | 'finish' | 'intro' | null

export type questionState = 'prompt' | 'responses' | null

export type defaultUserResponse = {
  node: number
  response: number
  correct: boolean
  time: number
}

export type TimelineNodeProps = {
  onFinish?: (userResponse: defaultUserResponse) => void
  isActive?: boolean
  index?: number
}
