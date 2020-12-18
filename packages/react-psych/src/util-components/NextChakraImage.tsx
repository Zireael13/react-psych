import { Box, BoxProps, ChakraProps } from '@chakra-ui/react'
import NextImage from 'next/image'
import React from 'react'

type NextImageProps = Parameters<typeof NextImage>[0]

export type NextChakraImageProps = Omit<ChakraProps, 'width' | 'height'> &
  Omit<NextImageProps, 'width' | 'height'> & {
    dimensions: [number, number]
  }

export type ImageProps = Omit<BoxProps, 'position'> & {
  height: string | number
  width: string | number
  src: string
}

export const NextChakraImage: React.FC<ImageProps> = ({ src, ...props }) => {
  return (
    <Box position="relative" {...props}>
      <NextImage src={src} layout="fill" objectFit="contain" />
    </Box>
  )
}
