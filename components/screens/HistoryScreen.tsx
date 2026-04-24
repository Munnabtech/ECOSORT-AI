'use client'

import BottomNav from '@/components/BottomNav'
import type { ScanResult } from '@/app/page'

interface HistoryScreenProps {
  scans: ScanResult[]
  setScreen: (screen: string) => void
  setScanResult: (result: ScanResult) => void
}

export default function HistoryScreen({ scans, setScreen, setScanResult }: HistoryScreenProps) {
  const icons: Record<string, string> = {
    Plastic: '🧴', Paper: '📄', Metal: '🥫', Glass: '🔴', Organic: '🍃', 'E-Waste': '💡'
  }

  return (
    <div className="min-h-screen pb-24 screen-enter">
      {/* Header */}
      <div className="glass border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => setScreen('dashboard')} className="text-[#6EE7B7]">← Back</button>
          <h1 className="font-heading font-bold text-[#F0FDF4]">Scan History</h1>
          <span className="stat-number text-sm">{scans.length}</span>
        </div>
      </div>

      <div className="px-4 py-6">
        {scans.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3 opacity-30">📭</div>
            <p className="text-[#6EE7B7] mb-4">No scans yet</p>
            <button
              onClick={() => setScreen('scan')}
              className="btn-primary inline-block"
            >
              Start Scanning →
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {scans.map((scan) => (
              <button
                key={scan.id}
                onClick={() => {
                  setScanResult(scan)
                  setScreen('result')
                }}
                className="w-full glass rounded-xl p-4 flex items-center justify-between group hover:border-[#22C55E] hover:shadow-[0_0_16px_rgba(34,197,94,0.4)] transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{icons[scan.type] || '🔍'}</div>
                  <div>
                    <p className="text-[#F0FDF4] font-semibold">{scan.type}</p>
                    <p className="text-[#6EE7B7] text-xs">{scan.timestamp}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="stat-number text-sm font-bold">{Math.round(scan.confidence * 100)}%</p>
                  <p className="text-[#6EE7B7] text-xs">View →</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav currentScreen="history" setScreen={setScreen} />
    </div>
  )
}
