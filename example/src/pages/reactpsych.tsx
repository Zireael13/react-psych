import React from 'react'
import { ImageQuestion, Timeline } from '../react-psych'
import { createQuestionList } from '../react-psych/utils/createImagePaths'

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

const reactpsych: React.FC<reactpsychProps> = () => {
  return (
    <Timeline>
      <ImageQuestion {...questionList[0]} />
      <ImageQuestion {...questionList[1]} />
      <ImageQuestion {...questionList[2]} />
    </Timeline>
  )
}

export default reactpsych
