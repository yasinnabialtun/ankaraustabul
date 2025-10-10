import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedIconProps {
  icon: LucideIcon
  size?: number
  className?: string
  animation?: 'bounce' | 'pulse' | 'rotate' | 'float' | 'none'
  delay?: number
  duration?: number
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  size = 24,
  className,
  animation = 'none',
  delay = 0,
  duration = 1
}) => {
  const getAnimation = () => {
    switch (animation) {
      case 'bounce':
        return {
          animate: { y: [0, -10, 0] },
          transition: { duration, repeat: Infinity, delay }
        }
      case 'pulse':
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: { duration, repeat: Infinity, delay }
        }
      case 'rotate':
        return {
          animate: { rotate: 360 },
          transition: { duration, repeat: Infinity, delay, ease: 'linear' }
        }
      case 'float':
        return {
          animate: { y: [0, -5, 0] },
          transition: { duration, repeat: Infinity, delay, ease: 'easeInOut' }
        }
      default:
        return {}
    }
  }

  const animationProps = getAnimation()

  return (
    <motion.div
      {...animationProps}
      className={cn('inline-flex items-center justify-center', className)}
    >
      <Icon size={size} />
    </motion.div>
  )
}

export default AnimatedIcon