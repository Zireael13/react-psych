import React from 'react'
import { chakra, ChakraProps } from '@chakra-ui/react'
import NextImage from 'next/image'

type NextImageProps = Parameters<typeof NextImage>[0]

export type NextChakraImageProps = Omit<ChakraProps, 'width' | 'height'> &
  Omit<NextImageProps, 'width' | 'height'> & {
    dimensions: [number, number]
  }

export const NextChakraImage: React.FC<NextChakraImageProps> = chakra(
  ({ dimensions, ...props }) => {
    const [width, height] = dimensions
    return <NextImage {...props} width={width} height={height} />
  }
)
