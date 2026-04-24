'use client'

import { motion } from 'framer-motion'

export function SkeletonLoader() {
  const shimmer = {
    initial: { backgroundPosition: '-1000px 0' },
    animate: { backgroundPosition: '1000px 0' },
  }

  return (
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      transition={{ duration: 2, repeat: Infinity }}
      className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg"
      style={{
        backgroundSize: '1000px 100%',
      }}
    />
  )
}

export function CardSkeleton() {
  const pulse = {
    initial: { opacity: 0.6 },
    animate: { opacity: 1 },
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl border border-gray-100">
      <motion.div
        variants={pulse}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.5, repeat: Infinity }}
        className="h-8 bg-gray-200 rounded-lg"
      />
      <motion.div
        variants={pulse}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        className="h-4 bg-gray-200 rounded-lg w-3/4"
      />
      <motion.div
        variants={pulse}
        initial="initial"
        animate="animate"
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        className="h-4 bg-gray-200 rounded-lg w-1/2"
      />
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <SkeletonLoader />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CardSkeleton />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
