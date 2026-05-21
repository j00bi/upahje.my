'use client'

import { motion } from 'motion/react'
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

  return (
    <Tag
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </Tag>
  )
}
