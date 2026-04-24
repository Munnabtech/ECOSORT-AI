'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  ArrowLeft,
  Download,
  Share2,
  Zap,
  Leaf,
  Trash2,
  RecycleIcon,
  RotateCcw,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Results() {
  const [copied, setCopied] = useState(false)

  const result = {
    item: 'Plastic Bottle',
    confidence: 98.7,
    category: 'Recyclable',
    material: 'PET Plastic',
    instructions: [
      'Rinse the bottle thoroughly',
      'Remove the cap and set aside',
      'Place in the recyclables bin',
      'Check local recycling guidelines',
    ],
    impact: {
      co2Saved: 0.45,
      waterSaved: 15.3,
      energySaved: 0.12,
    },
    alternatives: [
      {
        id: 1,
        name: 'Glass Bottle',
        confidence: 0.8,
        icon: Leaf,
      },
      { id: 2, name: 'Can', confidence: 0.5, icon: RecycleIcon },
    ],
  }

  const copyToClipboard = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6"
      >
        <Link
          href="/scan"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </motion.div>

      <main className="max-w-4xl mx-auto px-6 pb-12">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <motion.div variants={item} className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
              className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl font-bold text-gray-900 mb-3">
            Perfect Match!
          </motion.h1>
          <motion.p variants={item} className="text-lg text-gray-600">
            We&apos;ve analyzed your item with high confidence
          </motion.p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8"
        >
          {/* Result Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left - Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl aspect-square flex items-center justify-center overflow-hidden"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-24 h-24 text-green-400 opacity-50" />
              </motion.div>
            </motion.div>

            {/* Right - Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center space-y-6"
            >
              {/* Item Name */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Detected Item</p>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold text-gray-900"
                >
                  {result.item}
                </motion.h2>
              </div>

              {/* Confidence */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-3">
                  Recognition Confidence
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {result.confidence}%
                    </span>
                    <span className="text-sm text-green-600 font-medium">
                      Excellent
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-full h-3 bg-gray-200 rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <RecycleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold text-gray-900">{result.category}</p>
                </div>
              </div>

              {/* Material */}
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Leaf className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Material Type</p>
                  <p className="font-semibold text-gray-900">{result.material}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-50 text-green-600 rounded-full font-semibold hover:bg-green-100 transition-all duration-300 border border-green-200">
              <Download className="w-5 h-5" />
              Download Report
            </button>
            <button
              onClick={copyToClipboard}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-full font-semibold hover:bg-blue-100 transition-all duration-300 border border-blue-200"
            >
              <Share2 className="w-5 h-5" />
              {copied ? 'Copied!' : 'Share'}
            </button>
          </motion.div>
        </motion.div>

        {/* Disposal Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            How to Dispose Properly
          </h3>
          <div className="space-y-4">
            {result.instructions.map((instruction, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.05 }}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-300"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold"
                >
                  {i + 1}
                </motion.div>
                <p className="text-gray-700 leading-relaxed">{instruction}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Environmental Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: 'CO₂ Saved',
                value: `${result.impact.co2Saved} kg`,
                unit: 'per item',
              },
              {
                label: 'Water Saved',
                value: `${result.impact.waterSaved} L`,
                unit: 'per item',
              },
              {
                label: 'Energy Saved',
                value: `${result.impact.energySaved} kWh`,
                unit: 'per item',
              },
            ].map((impact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.1 }}
                className="bg-white rounded-xl p-6"
              >
                <motion.p
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-3xl font-bold text-green-600 mb-2"
                >
                  {impact.value}
                </motion.p>
                <p className="text-gray-900 font-semibold">{impact.label}</p>
                <p className="text-sm text-gray-500">{impact.unit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alternative Matches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-gray-100 p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Alternative Matches</h3>
          <div className="space-y-4">
            {result.alternatives.map((alt, i) => {
              const AltIcon = alt.icon
              return (
                <motion.div
                  key={alt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.05 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <AltIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-900">{alt.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {(alt.confidence * 100).toFixed(1)}% similar
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Next Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 justify-center"
        >
          <Link
            href="/scan"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            Scan Another Item
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Back to Dashboard
          </Link>
        </motion.div>
      </main>
    </div>
  )
}
