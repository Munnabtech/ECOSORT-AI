'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, TrendingUp, PieChart, BarChart3, Download } from 'lucide-react'

export default function Reports() {
  const stats = [
    { label: 'Total Scans', value: '142', change: '+12 this week', icon: BarChart3 },
    { label: 'CO₂ Saved', value: '24.5kg', change: '+3.2kg this week', icon: TrendingUp },
    { label: 'Recyclables', value: '89%', change: '+5% vs last month', icon: PieChart },
    { label: 'Streak Days', value: '12', change: 'Keep it up!', icon: TrendingUp },
  ]

  const monthlyData = [
    { month: 'Jan', scans: 45, co2: 8.2 },
    { month: 'Feb', scans: 52, co2: 9.5 },
    { month: 'Mar', scans: 65, co2: 11.3 },
    { month: 'Apr', scans: 78, co2: 13.8 },
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
          Back to Dashboard
        </Link>
      </motion.div>

      <main className="max-w-6xl mx-auto px-6 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600">Track your waste sorting impact over time</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Monthly Scans */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Scans</h2>
            <div className="space-y-4">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex items-end gap-4">
                  <div className="w-12 font-semibold text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.scans / 100) * 100}%` }}
                        transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                      />
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 min-w-fit">{data.scans}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CO₂ Saved */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">CO₂ Saved (kg)</h2>
            <div className="space-y-4">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex items-end gap-4">
                  <div className="w-12 font-semibold text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.co2 / 16) * 100}%` }}
                        transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-blue-400 to-cyan-600"
                      />
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 min-w-fit">{data.co2}kg</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Impact Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-2">Total Waste Sorted</p>
              <p className="text-3xl font-bold text-green-600">342 items</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Environmental Impact</p>
              <p className="text-3xl font-bold text-green-600">47.8 kg CO₂</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Efficiency Score</p>
              <p className="text-3xl font-bold text-green-600">94.2%</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
