'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Filter, Download } from 'lucide-react'

export default function History() {
  const scans = [
    {
      id: 1,
      item: 'Plastic Bottle',
      category: 'Recyclable',
      date: '2024-01-15 2:30 PM',
      confidence: 98,
      notes: 'Clear PET plastic',
    },
    {
      id: 2,
      item: 'Paper Bag',
      category: 'Compostable',
      date: '2024-01-15 1:15 PM',
      confidence: 96,
      notes: 'Brown kraft paper',
    },
    {
      id: 3,
      item: 'Glass Jar',
      category: 'Recyclable',
      date: '2024-01-14 11:45 AM',
      confidence: 99,
      notes: 'Clear glass',
    },
    {
      id: 4,
      item: 'Aluminum Can',
      category: 'Recyclable',
      date: '2024-01-14 10:20 AM',
      confidence: 97,
      notes: 'Aluminum beverage can',
    },
    {
      id: 5,
      item: 'Styrofoam Container',
      category: 'Non-Recyclable',
      date: '2024-01-13 4:00 PM',
      confidence: 95,
      notes: 'Food packaging',
    },
    {
      id: 6,
      item: 'Cardboard Box',
      category: 'Recyclable',
      date: '2024-01-13 2:30 PM',
      confidence: 99,
      notes: 'Corrugated cardboard',
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
          Back to Dashboard
        </Link>
      </motion.div>

      <main className="max-w-6xl mx-auto px-6 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Scan History</h1>
              <p className="text-gray-600">View all your waste classification records</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-full hover:border-gray-300 transition-all">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-50 border-2 border-green-200 text-green-700 rounded-full hover:bg-green-100 transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scans Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Item</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Confidence</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, i) => (
                  <motion.tr
                    key={scan.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{scan.item}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {scan.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {scan.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${scan.confidence}%` }}
                            transition={{ delay: 0.25 + i * 0.05, duration: 0.6 }}
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                          />
                        </div>
                        <span className="font-semibold text-gray-900 min-w-fit">{scan.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{scan.notes}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
