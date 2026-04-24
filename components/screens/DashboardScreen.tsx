'use client'

import { Bell, LogOut } from 'lucide-react'
import BottomNav from '@/components/BottomNav'

interface DashboardScreenProps {
  userName: string
  scansCount: number
  setScreen: (screen: string) => void
  onLogout: () => void
}

export default function DashboardScreen({
  userName,
  scansCount,
  setScreen,
  onLogout,
}: DashboardScreenProps) {
  const quickActions = [
    { icon: '📷', label: 'Scan Waste', screen: 'scan' },
    { icon: '📋', label: 'Scan History', screen: 'history' },
    { icon: '🚨', label: 'Report Issue', screen: 'report' },
    { icon: '📞', label: 'Contact', screen: 'contact' },
  ]

  const tips = [
    'Rinse plastic before placing in blue bin',
    'Flatten cardboard to triple bin capacity',
    'E-waste in regular bins = toxic landfill'
  ]

  return (
    <div className="min-h-screen pb-24 screen-enter">
      {/* Glass Navbar */}
      <div className="glass border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#10B981] flex items-center justify-center">
              <span className="text-white font-heading font-bold">🌿</span>
            </div>
            <div>
              <h1 className="font-heading text-white font-bold">EcoSort AI</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:glass rounded-lg transition-all">
              <Bell className="w-5 h-5 text-[#22C55E]" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-[#22C55E] rounded-full glow-green-sm" />
            </button>
            <button
              onClick={onLogout}
              className="p-2 hover:glass rounded-lg transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-[#F0FDF4]" />
            </button>
          </div>
        </div>
        <div className="px-6 py-2 pb-4 text-[#6EE7B7] text-sm">
          Hi, {userName} 👋
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mx-4 mt-6 glass-thick rounded-2xl p-6 glow-green-lg overflow-hidden relative">
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#22C55E]/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="inline-block mb-3 px-3 py-1 glass rounded-full border border-[rgba(34,197,94,0.3)]">
            <span className="text-xs section-label">🤖 AI-Powered Detection</span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#F0FDF4] mb-2">
            Scan. Identify.<br />Recycle Smarter.
          </h2>
          <p className="text-[#6EE7B7] text-sm mb-4">
            Upload any waste photo and our AI identifies type + recycling method instantly.
          </p>
          <button
            onClick={() => setScreen('scan')}
            className="btn-primary inline-flex gap-2"
          >
            Start Scanning →
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-4 mt-6 grid grid-cols-3 gap-3">
        {[
          { label: 'Scans Done', value: scansCount, icon: '📷' },
          { label: 'Types Found', value: Math.max(scansCount, 0), icon: '✅' },
          { label: 'Reports Sent', value: '0', icon: '📊' },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-xl p-4 text-center glow-green-sm border-b-2 border-b-[rgba(34,197,94,0.2)] relative">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="stat-number text-xl font-bold">{stat.value}</div>
            <p className="section-label text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-8">
        <p className="section-label mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => setScreen(action.screen as any)}
              className="glass rounded-xl p-4 text-center transition-all hover:border-[#22C55E] hover:shadow-[0_0_16px_rgba(34,197,94,0.4)] group"
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <p className="text-[#F0FDF4] font-medium text-sm">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Eco Tips */}
      <div className="px-4 mt-8 mb-6">
        <p className="section-label mb-3">💡 Eco Tips</p>
        <div className="space-y-2">
          {tips.map((tip, i) => (
            <div key={i} className="glass rounded-xl p-3 border-l-2 border-l-[#22C55E] flex items-start gap-2 text-sm text-[#6EE7B7]">
              <span className="flex-shrink-0 mt-0.5">📌</span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Team Button */}
      <div className="px-4 mb-8">
        <button
          onClick={() => setScreen('team')}
          className="btn-ghost w-full"
        >
          Meet Our Team →
        </button>
      </div>

      <BottomNav currentScreen="dashboard" setScreen={setScreen} />
    </div>
  )
}
