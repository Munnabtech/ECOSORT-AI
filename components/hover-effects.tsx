'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverCardProps extends MotionProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className = '', ...props }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 30px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface FloatingActionButtonProps {
  icon: ReactNode
  onClick?: () => void
  label?: string
  variant?: 'primary' | 'secondary'
}

export function FloatingActionButton({
  icon,
  onClick,
  label,
  variant = 'primary',
}: FloatingActionButtonProps) {
  const bgColors = {
    primary: 'bg-gradient-to-br from-green-500 to-emerald-600',
    secondary: 'bg-gray-100',
  }

  const textColors = {
    primary: 'text-white',
    secondary: 'text-gray-900',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full ${bgColors[variant]} ${textColors[variant]} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40`}
      onClick={onClick}
      title={label}
    >
      {icon}
    </motion.button>
  )
}

interface ProgressBarProps {
  value: number
  animated?: boolean
  color?: 'primary' | 'success' | 'warning' | 'error'
}

export function ProgressBar({
  value,
  animated = true,
  color = 'primary',
}: ProgressBarProps) {
  const colors = {
    primary: 'from-green-500 to-emerald-600',
    success: 'from-emerald-500 to-teal-600',
    warning: 'from-yellow-500 to-amber-600',
    error: 'from-red-500 to-pink-600',
  }

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={
          animated
            ? { duration: 0.8, ease: 'easeOut' }
            : { duration: 0, immediate: true }
        }
        className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
      />
    </div>
  )
}

interface CountUpProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
}: CountUpProps) {
  const [displayValue, setDisplayValue] = motion.useMotionValue(0)
  const [roundedValue, setRoundedValue] = motion.useMotionValue(0)

  motion.useEffect(() => {
    motion.animate(displayValue, value, {
      duration,
      onUpdate: (v) => {
        setRoundedValue(Math.round(v))
      },
    })
  }, [value, duration, displayValue, setRoundedValue])

  return (
    <motion.span>
      {prefix}
      {roundedValue}
      {suffix}
    </motion.span>
  )
}
