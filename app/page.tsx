'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Zap, BarChart3, Heart, ArrowRight, CheckCircle2 } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Recognition',
      description: 'Instant waste classification using advanced computer vision technology',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Track your waste sorting patterns and environmental impact',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Impact',
      description: 'Contribute to sustainability and see your positive impact',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Heart,
      title: 'Community Driven',
      description: 'Join thousands of users making a difference for the planet',
      color: 'from-pink-500 to-rose-500',
    },
  ]

  const stats = [
    { label: 'Items Classified', value: '2.4M+' },
    { label: 'Active Users', value: '150K+' },
    { label: 'CO₂ Saved', value: '500T+' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EcoSort</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-all hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-white via-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center space-y-8"
          >
            {/* Hero Badge */}
            <motion.div variants={item} className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft" />
                <span className="text-sm font-medium text-green-700">
                  AI-Powered Waste Classification
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={item} className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
              Sort Smarter,
              <br />
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Live Greener
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={item}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Intelligent waste sorting made simple. Scan any item and get instant AI-powered classification to reduce environmental impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/signup"
                className="group px-8 py-4 bg-green-500 text-white rounded-full font-semibold text-lg hover:bg-green-600 transition-all hover:shadow-2xl hover:shadow-green-500/30 flex items-center justify-center gap-2"
              >
                Start Sorting Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="mt-20 relative"
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 aspect-video flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-center"
              >
                <Zap className="w-20 h-20 text-green-500 mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 font-medium">AI Classification Demo Coming Soon</p>
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={item} className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-4xl md:text-5xl font-bold text-green-600 mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Smarter Sorting
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to make waste management effortless and impactful
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  variants={item}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="p-8 rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/10"
                >
                  <motion.div
                    animate={hoveredFeature === i ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4 text-white`}
                  >
                    <Icon className="w-full h-full" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16"
          >
            How EcoSort Works
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { num: '01', title: 'Scan', desc: 'Point your camera at any waste item' },
              { num: '02', title: 'Analyze', desc: 'AI instantly classifies the material' },
              { num: '03', title: 'Sort', desc: 'Get proper disposal recommendations' },
              { num: '04', title: 'Track', desc: 'Monitor your environmental impact' },
            ].map((step, i) => (
              <motion.div key={i} variants={item} className="relative">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
                  >
                    {step.num}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-gray-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 text-center mb-16"
          >
            Why Choose EcoSort?
          </motion.h2>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            {[
              'Accurate AI-powered waste classification with 99.2% accuracy rate',
              'Real-time environmental impact tracking and sustainability reports',
              'Seamless integration with local recycling and waste management services',
              'Educational resources to improve waste sorting knowledge',
              'Community leaderboards to inspire sustainable practices',
            ].map((benefit, i) => (
              <motion.div
                key={i}
                variants={item}
                className="flex items-start gap-4 p-6 rounded-xl bg-green-50 border border-green-100 hover:border-green-300 transition-all"
              >
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700 font-medium">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-green-50 max-w-2xl mx-auto">
              Join thousands of users who are already sorting smarter and living greener
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Start Your Free Account Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-green-500" />
                <span className="font-bold text-white">EcoSort</span>
              </div>
              <p className="text-sm">Making waste sorting intelligent and sustainable.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 EcoSort. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
