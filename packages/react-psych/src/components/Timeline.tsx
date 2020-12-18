import React, {
  ReactChild,
  ReactChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { defaultUserResponse } from '../types'

export interface TimelineProps {
  children: ReactChild | ReactChildren | JSX.Element[] | any
  onFinish: () => void
}

const Wrapper = ({ children }: { children?: ReactNode }): JSX.Element => {
  return (children as unknown) as JSX.Element
}

export const Timeline: React.FC<TimelineProps> = ({ children, onFinish }) => {
  const [activeNode, setActiveNode] = useState(0)
  const [timelineData, setTimelineData] = useState<defaultUserResponse[]>([])

  const nodeCount = React.Children.count(children)

  const onNodeFinish = (nodeData: defaultUserResponse): void => {
    console.log(`Node ${activeNode} finished`)
    console.log('data: ', nodeData)
    setTimelineData((prevData) => {
      return [...prevData, nodeData]
    })
    if (activeNode < nodeCount - 1) {
      setActiveNode(activeNode + 1)
    }
    if (activeNode === nodeCount - 1) {
      console.log('finished')
      onFinish()
    }
  }

  useEffect(() => {
    if (timelineData.length === nodeCount) {
      console.log('submitting timeline data')
      console.log(timelineData)
    }
  }, [timelineData, nodeCount])

  const childrenWithProps = React.Children.map(
    Wrapper({ children }),
    (child, index) => {
      return React.cloneElement(child, {
        timeline: {
          onFinish: onNodeFinish,
          index,
          isActive: index === activeNode,
        },
      })
    }
  )

  return <div>{childrenWithProps}</div>
}
