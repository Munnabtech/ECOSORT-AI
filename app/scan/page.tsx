'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Camera, Upload, ArrowLeft, Zap } from 'lucide-react'

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

export default function Scan() {
  const router = useRouter()
  const [cameraActive, setCameraActive] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleCapture = () => {
    // Simulate camera capture
    setPreviewImage('/api/placeholder/500/500')
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      router.push('/results')
    }, 2000)
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
          <motion.h1 variants={item} className="text-4xl font-bold text-gray-900 mb-3">
            Scan an Item
          </motion.h1>
          <motion.p variants={item} className="text-lg text-gray-600 max-w-lg mx-auto">
            Point your camera at any waste item to get instant AI-powered classification
          </motion.p>
        </motion.div>

        {/* Camera/Upload Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          {!previewImage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camera Option */}
              <motion.button
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCameraActive(!cameraActive)}
                className="h-80 rounded-2xl border-2 border-dashed border-green-300 bg-green-50 flex flex-col items-center justify-center gap-4 hover:bg-green-100 transition-all duration-300 relative overflow-hidden group"
              >
                <motion.div
                  animate={cameraActive ? { rotate: [0, 5, -5, 0] } : {}}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="p-4 bg-green-500 text-white rounded-full"
                >
                  <Camera className="w-8 h-8" />
                </motion.div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {cameraActive ? 'Camera Active' : 'Use Camera'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {cameraActive ? 'Ready to scan' : 'Click to activate'}
                  </p>
                </div>
                {cameraActive && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCapture()
                    }}
                    className="absolute bottom-4 right-4 px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
                  >
                    Capture
                  </motion.button>
                )}
              </motion.button>

              {/* Upload Option */}
              <motion.label
                whileHover={{ y: -4, scale: 1.02 }}
                className="h-80 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 flex flex-col items-center justify-center gap-4 hover:bg-blue-100 transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-4 bg-blue-500 text-white rounded-full"
                >
                  <Upload className="w-8 h-8" />
                </motion.div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Upload Photo</p>
                  <p className="text-sm text-gray-600 mt-1">Click to browse files</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setPreviewImage(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
              </motion.label>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border-2 border-green-200 p-8"
            >
              <div className="space-y-6">
                {/* Preview */}
                <div className="relative h-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl overflow-hidden flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <Zap className="w-16 h-16 text-green-400 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-500 font-medium">Image Preview</p>
                  </motion.div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPreviewImage(null)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
                  >
                    Retake
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ⏳
                        </motion.span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Analyze
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Tips for Best Results</h3>
          <ul className="space-y-3">
            {[
              'Ensure good lighting and clear visibility of the item',
              'Position the item in the center of the frame',
              'Avoid shadows and reflections on the waste item',
              'Scan one item at a time for accurate classification',
            ].map((tip, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.05 }}
                className="flex items-start gap-3 text-gray-700"
              >
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {tip}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </main>
    </div>
  )
}
