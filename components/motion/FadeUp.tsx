'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  className?: string
  tag?: 'div' | 'section' | 'span'
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  distance = 24,
  once = true,
  className,
  tag = 'div',
}: Props) {
  const Tag = motion[tag]
  const reduceMotion = useReducedMotion()

  return (
    <Tag
      initial={reduceMotion ? false : { opacity: 1, y: Math.min(distance, 12) }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </Tag>
  )
}
