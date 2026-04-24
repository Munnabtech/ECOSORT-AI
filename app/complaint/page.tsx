'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  AlertTriangle,
  FileText,
  Send,
  CheckCircle2,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Complaint() {
  const [formData, setFormData] = useState({
    itemScanned: '',
    incorrectResult: '',
    details: '',
    email: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ itemScanned: '', incorrectResult: '', details: '', email: '' })
      }, 3000)
    }, 1500)
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
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </motion.div>

      <main className="max-w-2xl mx-auto px-6 pb-12">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <motion.div variants={item} className="flex justify-center mb-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </motion.div>
          <motion.h1 variants={item} className="text-4xl font-bold text-gray-900 mb-3">
            Report Misclassification
          </motion.h1>
          <motion.p variants={item} className="text-lg text-gray-600 max-w-lg mx-auto">
            Help us improve our AI by reporting incorrect classifications. Your feedback is valuable!
          </motion.p>
        </motion.div>

        {/* Form Card */}
        {!isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Scanned */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What item did you scan?
                </label>
                <input
                  type="text"
                  name="itemScanned"
                  value={formData.itemScanned}
                  onChange={handleChange}
                  placeholder="e.g., Plastic bag"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                />
              </motion.div>

              {/* Incorrect Result */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What did the AI classify it as?
                </label>
                <input
                  type="text"
                  name="incorrectResult"
                  value={formData.incorrectResult}
                  onChange={handleChange}
                  placeholder="e.g., Paper bag"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                />
              </motion.div>

              {/* Correct Classification */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is the correct classification?
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                  required
                >
                  <option value="">Select correct category</option>
                  <option value="recyclable">Recyclable</option>
                  <option value="compostable">Compostable</option>
                  <option value="hazardous">Hazardous</option>
                  <option value="landfill">Landfill</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              {/* Additional Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Please provide any additional information that might help us improve..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 resize-none"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-2">
                  We&apos;ll use this to follow up on your report
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ⏳
                    </motion.span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Report
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        ) : (
          /* Success Message */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              Report Submitted Successfully!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 max-w-md mx-auto"
            >
              Thank you for helping us improve. We&apos;ll analyze your feedback and use it to
              enhance our AI model.
            </motion.p>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
        >
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-yellow-600" />
            How Your Report Helps
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              • Your feedback is used to retrain our AI model for better accuracy
            </li>
            <li>• Reports are reviewed by our quality assurance team</li>
            <li>• All data is handled securely and in compliance with privacy laws</li>
            <li>
              • Frequent misclassifications are prioritized for improvement
            </li>
          </ul>
        </motion.div>
      </main>
    </div>
  )
}
