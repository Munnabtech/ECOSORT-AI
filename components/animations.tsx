'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  delay?: number
}

export function PageTransition({ children, delay = 0 }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function AnimatedInput({
  label,
  error,
  className = '',
  ...props
}: AnimatedInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 ${
          error ? 'border-red-500' : ''
        } ${className}`}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  ...props
}: AnimatedButtonProps) {
  const baseClasses =
    'font-semibold rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary:
      'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/30',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md',
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
      {...props}
    >
      {isLoading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="inline-block"
        >
          ⏳
        </motion.span>
      ) : (
        children
      )}
    </motion.button>
  )
}

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
  interactive?: boolean
}

export function AnimatedCard({
  children,
  delay = 0,
  className = '',
  interactive = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={interactive ? { y: -4, boxShadow: '0 20px 30px rgba(0,0,0,0.1)' } : {}}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className={`rounded-2xl bg-white border border-gray-100 p-6 transition-all ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  delay?: number
}

export function StaggerContainer({
  children,
  delay = 0,
}: StaggerContainerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
