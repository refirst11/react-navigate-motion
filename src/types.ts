import type { HTMLAttributes, ReactNode } from 'react'

type MotionProperties = {
  opacity?: number
  blur?: number
  scale?: number
  x?: number
  y?: number
  rotate?: number
  rotateX?: number
  rotateY?: number
  rotate3d?: [x: number, y: number, z: number, a: string]
  transition?: {
    duration: number
    ease?:
      | 'linear'
      | 'ease-in'
      | 'ease-out'
      | 'ease-in-out'
      | [x1: number, y1: number, x2: number, y2: number]
  }
}

export type MotionType = MotionProperties | undefined

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  children: ReactNode
  exit?: MotionType
  entry?: MotionType
  scroll?: boolean
  prefetch?: boolean
}

export interface RouterType {
  routing:
    | {
        push: (href: string) => void
        prefetch: (href: string) => void
      }
    | ((href: string) => void)
}
