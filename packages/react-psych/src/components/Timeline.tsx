import { Flex } from '@chakra-ui/react'
import React, {
  ReactChild,
  ReactChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { defaultUserResponse } from '../types'

export interface TimelineProps {
  children: ReactChild | ReactChildren | JSX.Element[] | any
  onFinish: (data: defaultUserResponse[]) => void
  size: string
}

const Wrapper = ({ children }: { children?: ReactNode }): JSX.Element => {
  return (children as unknown) as JSX.Element
}

export const Timeline: React.FC<TimelineProps> = ({
  children,
  onFinish,
  size,
}) => {
  const [activeNode, setActiveNode] = useState(0)
  const [timelineData, setTimelineData] = useState<defaultUserResponse[]>([])
  const [keyPressed, setKeyPressed] = useState<string | null>(null)

  const nodeCount = React.Children.count(children)
  const keyDown = useCallback(
    (e: KeyboardEvent): void => {
      const validKeys = [' ', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      console.log(e.key)
      if (validKeys.includes(e.key)) {
        e.preventDefault()
        setKeyPressed(e.key)
      }
    },
    [setKeyPressed]
  )
  // find better way to do this
  useEffect(() => {
    window.addEventListener('keydown', keyDown, { capture: true })
    return () => {
      window.removeEventListener('keydown', keyDown, { capture: true })
    }
  }, [keyDown])

  const onNodeFinish = (nodeData: defaultUserResponse): void => {
    console.log(`Node ${activeNode} finished`)
    console.log('data: ', nodeData)
    setTimelineData((prevData) => {
      return [...prevData, nodeData]
    })
    setKeyPressed(null)
    if (activeNode < nodeCount - 1) {
      setActiveNode(activeNode + 1)
    }
    if (activeNode === nodeCount - 1) {
      console.log('finished')
    }
  }

  const cbFinish = useCallback(() => onFinish(timelineData), [timelineData])

  useEffect(() => {
    if (timelineData.length === nodeCount) {
      cbFinish()
    }
  }, [timelineData, nodeCount, cbFinish])

  const childrenWithProps = React.Children.map(
    Wrapper({ children }),
    (child, index) => {
      return React.cloneElement(child, {
        timeline: {
          onFinish: onNodeFinish,
          index,
          isActive: index === activeNode,
          keyPressed,
        },
      })
    }
  )

  return (
    <Flex h={`${size}vh`} w={`${size}vw`} justify="center" align="center">
      {childrenWithProps}
    </Flex>
  )
}
