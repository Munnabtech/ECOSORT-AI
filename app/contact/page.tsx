'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  CheckCircle2,
  Clock,
  Zap,
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    }, 1500)
  }

  const contactChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Response within 24 hours',
      value: 'support@ecosort.com',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Mon-Fri, 9 AM - 5 PM EST',
      value: '+1 (555) 123-4567',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Average response: 5 min',
      value: 'Start Chat',
    },
  ]

  const faqs = [
    {
      question: 'How accurate is the AI classification?',
      answer:
        'Our AI achieves 98%+ accuracy on waste classification. We continuously improve through user feedback.',
    },
    {
      question: 'Can I use EcoSort offline?',
      answer:
        'Currently, EcoSort requires an internet connection for real-time AI analysis. Offline features are coming soon!',
    },
    {
      question: 'Is my data private and secure?',
      answer:
        'Yes! We use end-to-end encryption and comply with GDPR and CCPA regulations. Your data is never shared.',
    },
    {
      question: 'How do I delete my account?',
      answer:
        'You can delete your account anytime from Settings. All personal data will be permanently removed.',
    },
  ]

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

      <main className="max-w-6xl mx-auto px-6 pb-12">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-16"
        >
          <motion.h1 variants={item} className="text-5xl font-bold text-gray-900 mb-3">
            We&apos;re Here to Help
          </motion.h1>
          <motion.p variants={item} className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or need support? Our team is ready to assist you
          </motion.p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactChannels.map((channel, i) => {
            const Icon = channel.icon
            return (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 text-center"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {channel.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{channel.description}</p>
                <p className="font-semibold text-green-600">{channel.value}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Form */}
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                  />
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 resize-none"
                  />
                </motion.div>

                {/* Submit */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⏳
                      </motion.span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
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
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 flex flex-col items-center justify-center min-h-96"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
              >
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-gray-900 mb-2 text-center"
              >
                Message Sent!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 text-center"
              >
                Thank you! We&apos;ll get back to you within 24 hours.
              </motion.p>
            </motion.div>
          )}

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Response Time */}
            <motion.div
              whileHover={{ x: 4 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0 p-3 bg-green-200 rounded-lg"
                >
                  <Clock className="w-6 h-6 text-green-600" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Quick Response</h3>
                  <p className="text-sm text-gray-600">
                    Most inquiries are answered within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 24/7 Support */}
            <motion.div
              whileHover={{ x: 4 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0 p-3 bg-blue-200 rounded-lg"
                >
                  <Zap className="w-6 h-6 text-blue-600" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Always Available</h3>
                  <p className="text-sm text-gray-600">
                    Submit your inquiry anytime. We&apos;re here to help 24/7
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Multiple Channels */}
            <motion.div
              whileHover={{ x: 4 }}
              className="bg-purple-50 border border-purple-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0 p-3 bg-purple-200 rounded-lg"
                >
                  <Mail className="w-6 h-6 text-purple-600" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Multiple Channels</h3>
                  <p className="text-sm text-gray-600">
                    Reach us via email, phone, chat, or social media
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-100 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-xl p-6 hover:border-green-300 hover:bg-green-50/50 transition-all duration-300"
              >
                <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
