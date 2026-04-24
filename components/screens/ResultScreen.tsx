'use client'

import { ArrowRight, MapPin } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import type { ScanResult } from '@/app/page'

interface ResultScreenProps {
  result: ScanResult | null
  setScreen: (screen: string) => void
}

const recycleGuide: Record<string, string> = {
  Plastic: 'Clean and separate by resin code. Remove caps and labels. Place in blue bin.',
  Paper: 'Flatten boxes. Keep dry. Remove plastic windows from envelopes.',
  Metal: 'Rinse cans. Crush to save space. Never mix with glass.',
  Glass: 'Rinse thoroughly. Separate by color. Remove caps and labels.',
  Organic: 'Compost food scraps. Use green bin. Avoid meat and dairy.',
  'E-Waste': 'Never bin electronics. Drop at certified e-waste centers only.',
}

const impacts: Record<string, { co2: string; water: string; energy: string }> = {
  Plastic: { co2: '0.3kg', water: '2.5L', energy: '0.8kWh' },
  Paper: { co2: '0.2kg', water: '10L', energy: '0.5kWh' },
  Metal: { co2: '0.5kg', water: '1L', energy: '1.2kWh' },
  Glass: { co2: '0.1kg', water: '0.5L', energy: '0.3kWh' },
  Organic: { co2: '0kg', water: '0L', energy: '0kWh' },
  'E-Waste': { co2: '1kg', water: '5L', energy: '2kWh' },
}

export default function ResultScreen({ result, setScreen }: ResultScreenProps) {
  if (!result) {
    return <div className="min-h-screen" />
  }

  return (
    <div className="min-h-screen pb-24 screen-enter">
      {/* Header */}
      <div className="glass border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => setScreen('scan')} className="text-[#6EE7B7]">← Back</button>
          <h1 className="font-heading font-bold text-[#F0FDF4]">Scan Result</h1>
          <div className="w-6" />
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Hero Result Card */}
        <div className="glass-thick rounded-2xl p-8 glow-green-lg text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">{result.type === 'Plastic' ? '🧴' : result.type === 'Paper' ? '📄' : result.type === 'Metal' ? '🥫' : result.type === 'Glass' ? '🔴' : result.type === 'Organic' ? '🍃' : '💡'}</div>
          
          <div className="inline-block px-4 py-2 bg-[rgba(34,197,94,0.1)] rounded-full border border-[rgba(34,197,94,0.3)] mb-4">
            <span className="section-label">✅ Detected</span>
          </div>
          
          <h2 className="font-heading text-3xl font-bold text-[#F0FDF4] mb-4">{result.type}</h2>
          
          <div className="space-y-3">
            <div>
              <p className="text-[#6EE7B7] text-sm mb-2">Confidence Score</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[rgba(34,197,94,0.2)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#22C55E] to-[#10B981] transition-all duration-1000"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
                <span className="stat-number text-xl font-bold min-w-12">{Math.round(result.confidence * 100)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recycling Guide */}
        <div className="glass rounded-2xl p-6 mb-6 border-l-4 border-l-[#22C55E]">
          <h3 className="font-heading font-bold text-[#F0FDF4] mb-3">♻️ How to Recycle</h3>
          <p className="text-[#6EE7B7] text-sm leading-relaxed">{recycleGuide[result.type] || 'Sort before discarding.'}</p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { icon: '🌍', label: 'CO₂ Saved', value: impacts[result.type]?.co2 },
            { icon: '💧', label: 'Water', value: impacts[result.type]?.water },
            { icon: '⚡', label: 'Energy', value: impacts[result.type]?.energy },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-3 text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <p className="stat-number text-sm font-bold">{stat.value}</p>
              <p className="text-[#6EE7B7] text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Drop Point */}
        <div className="glass rounded-2xl p-6 mb-6">
          <h3 className="font-heading font-bold text-[#F0FDF4] mb-3">📍 Nearest Drop Point</h3>
          <div className="glass rounded-xl p-4 bg-[rgba(34,197,94,0.1)] mb-3 text-center">
            <p className="text-[#F0FDF4] font-semibold">Green Hub Center</p>
            <p className="text-[#6EE7B7] text-sm">2.3 km away</p>
          </div>
          <button
            onClick={() => window.open('https://maps.google.com')}
            className="btn-primary w-full text-sm"
          >
            Open in Maps →
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setScreen('scan')}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            🔄 Scan Another
          </button>
          <button
            onClick={() => setScreen('report')}
            className="btn-ghost w-full flex items-center justify-center gap-2"
          >
            🚨 Report Issue
          </button>
        </div>
      </div>

      <BottomNav currentScreen="result" setScreen={setScreen} />
    </div>
  )
}
