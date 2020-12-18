import { useEffect, useState } from 'react'

export const useResponseStart = (isActive: boolean): number => {
  const [responseStart, setResponseStart] = useState<number>(0)

  useEffect(() => {
    if (isActive) {
      setResponseStart(Date.now())
    }
  }, [isActive])

  return responseStart
}

export const getResponseTime = (responseStart: number): number => {
  const responseEnd = Date.now()

  return responseEnd - responseStart
}
