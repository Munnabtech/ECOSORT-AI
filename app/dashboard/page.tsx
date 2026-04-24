'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Home,
  Camera,
  FileText,
  AlertCircle,
  Mail,
  LogOut,
  Menu,
  X,
  Leaf,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { StaggerContainer } from '@/components/animations'

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

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  const navItems = [
    { id: 'home', label: 'Overview', icon: Home, href: '#' },
    { id: 'scan', label: 'Scan Item', icon: Camera, href: '/scan' },
    { id: 'history', label: 'History', icon: FileText, href: '#' },
    { id: 'reports', label: 'Reports', icon: BarChart3, href: '#' },
    { id: 'complaints', label: 'File Complaint', icon: AlertCircle, href: '/complaint' },
    { id: 'contact', label: 'Contact Support', icon: Mail, href: '/contact' },
  ]

  const stats = [
    {
      label: 'Items Scanned',
      value: '142',
      change: '+12 this week',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'CO₂ Saved',
      value: '24.5kg',
      change: '+3.2kg this week',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Accuracy Rate',
      value: '98.2%',
      change: 'Excellent',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
    },
  ]

  const recentScans = [
    {
      id: 1,
      item: 'Plastic Bottle',
      category: 'Recyclable',
      date: '2 hours ago',
      confidence: 98,
    },
    {
      id: 2,
      item: 'Paper Bag',
      category: 'Compostable',
      date: '5 hours ago',
      confidence: 96,
    },
    {
      id: 3,
      item: 'Glass Jar',
      category: 'Recyclable',
      date: '1 day ago',
      confidence: 99,
    },
    {
      id: 4,
      item: 'Aluminum Can',
      category: 'Recyclable',
      date: '2 days ago',
      confidence: 97,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Toggle */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Leaf className="w-6 h-6 text-green-600" />
          <span className="font-bold text-gray-900">EcoSort</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </motion.div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-30 lg:z-20 ${
          sidebarOpen ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 hidden lg:block">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">EcoSort</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 mt-12 lg:mt-0">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      setActiveNav(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeNav === item.id
                        ? 'bg-green-50 text-green-600 border-l-4 border-green-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 border-t border-gray-200"
          >
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all duration-300">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </motion.div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
            <p className="text-gray-600">Here&apos;s your waste sorting summary for today</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={i}
                  variants={item}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-2">
                        {stat.label}
                      </p>
                      <motion.p
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-3xl font-bold text-gray-900"
                      >
                        {stat.value}
                      </motion.p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Quick Action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <Camera className="w-5 h-5" />
              Scan New Item
            </Link>
          </motion.div>

          {/* Recent Scans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Scans</h2>
            <div className="space-y-4">
              {recentScans.map((scan, i) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 + i * 0.05, duration: 0.4 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{scan.item}</p>
                    <p className="text-sm text-gray-500">{scan.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {scan.category}
                    </span>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {scan.confidence}%
                      </p>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scan.confidence}%` }}
                          transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
