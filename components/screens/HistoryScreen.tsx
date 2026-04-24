import { ArrowUp } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import type { ScanResult } from '@/app/page'

interface HistoryScreenProps {
  scans: ScanResult[]
  setScreen: (screen: string) => void
}

export default function HistoryScreen({ scans, setScreen }: HistoryScreenProps) {
  const recyclingIcon: Record<string, string> = {
    Paper: '📄',
    Plastic: '🧴',
    Glass: '🔴',
    Metal: '🥫',
    Organic: '🍌',
    Electronics: '📱',
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-6 pt-6 pb-8 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Scan History</h1>
        <p className="text-sm text-muted-foreground">
          {scans.length} item{scans.length !== 1 ? 's' : ''} scanned
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {scans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No scans yet</p>
            <button
              onClick={() => setScreen('scan')}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold"
            >
              Start Scanning
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {scans.map((scan) => (
              <div
                key={scan.id}
                className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between animate-fadeInUp hover:border-primary transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">
                    {recyclingIcon[scan.type] || '🔍'}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{scan.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {scan.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">
                    {(scan.confidence * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {scan.recyclable ? '♻️ Yes' : '✕ No'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav currentScreen="history" setScreen={setScreen} />
    </div>
  )
}
