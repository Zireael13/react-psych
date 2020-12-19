export type TextAnswer = {
  answerText: string
}

export type TextQuestionType = {
  prompt: string
  answers: TextAnswer[]
  correct: number
}
//comment

export type ImageResponse = {
  answerImage: string
}

export type ImageQuestionFields = {
  stimulus: string
  responses: ImageResponse[]
  correct: number
}

export type experimentElement = 'question' | 'finish' | 'intro' | null

export type questionState = 'prompt' | 'responses' | null

export type defaultUserResponse = {
  node: number
  response: number | string | null
  correct: boolean | null
  time: number | null
}

export type TimelineNodeProps = {
  onFinish: (userResponse: defaultUserResponse) => void
  isActive: boolean
  index: number
  keyPressed: string | null
}
