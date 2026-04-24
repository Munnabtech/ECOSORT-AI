'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Leaf, CheckCircle2 } from 'lucide-react'

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

export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agreeTerms, setAgreeTerms] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setTimeout(() => {
      router.push('/dashboard')
      setIsLoading(false)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 flex items-center justify-center px-6 py-12">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-md z-10"
      >
        {/* Logo */}
        <motion.div variants={item} className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">EcoSort</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join EcoSort</h1>
          <p className="text-gray-600 mt-2">Start sorting smarter today</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={item}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-200 ${
                    errors.name
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                  }`}
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-200 ${
                    errors.email
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                  }`}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-200 ${
                    errors.password
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                  }`}
                />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-200 ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-red-600"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="flex items-start gap-3 pt-2"
            >
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked)
                  if (e.target.checked && errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: '' }))
                  }
                }}
                className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 accent-green-500 cursor-pointer"
              />
              <label className="text-sm text-gray-600 cursor-pointer">
                I agree to the{' '}
                <Link href="/" className="text-green-600 font-semibold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/" className="text-green-600 font-semibold hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </motion.div>
            {errors.terms && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600"
              >
                {errors.terms}
              </motion.p>
            )}

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ⏳
                </motion.span>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Sign In Link */}
        <motion.p
          variants={item}
          className="text-center mt-6 text-gray-600"
        >
          Already have an account?{' '}
          <Link href="/login" className="text-green-600 font-semibold hover:text-green-700">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
