'use client'

import React from 'react'
import BottomNav from '@/components/BottomNav'
import type { ScanResult } from '@/app/page'

interface ReportScreenProps {
  setScreen: (screen: string) => void
  showToast: (msg: string, type: 'success' | 'error', icon: string) => void
}

export default function ReportScreen({ setScreen, showToast }: ReportScreenProps) {
  const [issueType, setIssueType] = React.useState('dumping')
  const [location, setLocation] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [urgency, setUrgency] = React.useState<'low' | 'medium' | 'high'>('medium')
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!location.trim() || !description.trim()) {
      showToast('Please fill all fields', 'error', '⚠️')
      return
    }
    setIsSubmitting(true)
    setTimeout(() => {
      showToast('Report submitted! Team responds in 24hrs', 'success', '✅')
      setIsSubmitting(false)
      setScreen('dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen pb-24 screen-enter">
      {/* Header */}
      <div className="glass border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => setScreen('dashboard')} className="text-[#6EE7B7]">← Back</button>
          <h1 className="font-heading font-bold text-[#F0FDF4]">Report Issue</h1>
          <div className="w-6" />
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="inline-block px-4 py-2 bg-[rgba(255,152,0,0.1)] rounded-full border border-[rgba(255,152,0,0.3)] mb-6">
          <span className="section-label text-[#FFB74D]">🚨 Help us keep cities clean</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Issue Type */}
          <div>
            <label className="section-label block mb-2">Issue Type</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full glass rounded-xl px-4 py-3 text-[#F0FDF4] outline-none focus:border-[#22C55E]"
            >
              <option value="dumping">🗑 Illegal Dumping</option>
              <option value="pickup">🚛 Missed Pickup</option>
              <option value="overflowing">♻️ Overflowing Bin</option>
              <option value="other">❓ Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="section-label block mb-2">Location</label>
            <input
              type="text"
              placeholder="e.g. MG Road, Bangalore"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full glass rounded-xl px-4 py-3 text-[#F0FDF4] placeholder-[rgba(110,231,183,0.5)] outline-none focus:border-[#22C55E]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="section-label block mb-2">Description</label>
            <textarea
              placeholder="Tell us what happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full glass rounded-xl px-4 py-3 text-[#F0FDF4] placeholder-[rgba(110,231,183,0.5)] outline-none focus:border-[#22C55E] resize-none"
            />
          </div>

          {/* Urgency */}
          <div>
            <label className="section-label block mb-2">Urgency</label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setUrgency(level)}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all capitalize ${
                    urgency === level
                      ? level === 'low'
                        ? 'bg-green-500 text-white'
                        : level === 'medium'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'glass hover:border-[#22C55E]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>

      <BottomNav currentScreen="report" setScreen={setScreen} />
    </div>
  )
}
