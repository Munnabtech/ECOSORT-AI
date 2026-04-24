import { BarChart3 } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import type { ScanResult } from '@/app/page'

interface ReportScreenProps {
  scans: ScanResult[]
  setScreen: (screen: string) => void
}

export default function ReportScreen({ scans, setScreen }: ReportScreenProps) {
  const recyclableCount = scans.filter(s => s.recyclable).length
  const notRecyclableCount = scans.filter(s => !s.recyclable).length
  const avgConfidence = scans.length > 0
    ? (scans.reduce((sum, s) => sum + s.confidence, 0) / scans.length) * 100
    : 0

  const typeCount: Record<string, number> = {}
  scans.forEach(scan => {
    typeCount[scan.type] = (typeCount[scan.type] || 0) + 1
  })

  const co2Saved = recyclableCount * 2.5 // kg CO2 saved per item
  const landfillReduced = notRecyclableCount * 0.5 // kg

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-6 pt-6 pb-8 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Impact Report</h1>
        <p className="text-sm text-muted-foreground">Your sustainability metrics</p>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {scans.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No data yet. Start scanning to generate reports!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl p-6 border border-border text-center animate-fadeInUp">
                <div className="text-4xl font-bold text-primary mb-2">
                  {(avgConfidence).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Avg Confidence</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border text-center animate-fadeInUp">
                <div className="text-4xl font-bold text-primary mb-2">{scans.length}</div>
                <p className="text-xs text-muted-foreground">Total Scans</p>
              </div>
            </div>

            {/* Recyclability Stats */}
            <div className="bg-card rounded-2xl p-6 border border-border animate-fadeInUp">
              <h3 className="font-semibold text-foreground mb-4">Waste Breakdown</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">♻️ Recyclable</span>
                    <span className="font-bold text-primary">{recyclableCount}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${(recyclableCount / scans.length) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">✕ Not Recyclable</span>
                    <span className="font-bold text-destructive">{notRecyclableCount}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-destructive h-full rounded-full transition-all"
                      style={{ width: `${(notRecyclableCount / scans.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 animate-fadeInUp">
              <h3 className="font-semibold text-foreground mb-4">🌍 Environmental Impact</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">CO₂ Saved</span>
                  <span className="font-bold text-primary">{co2Saved.toFixed(1)} kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Landfill Reduced</span>
                  <span className="font-bold text-primary">{landfillReduced.toFixed(1)} kg</span>
                </div>
              </div>
            </div>

            {/* Most Scanned */}
            {Object.keys(typeCount).length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border animate-fadeInUp">
                <h3 className="font-semibold text-foreground mb-4">Most Scanned</h3>
                <div className="space-y-2">
                  {Object.entries(typeCount)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{type}</span>
                        <span className="font-bold text-primary">{count}x</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav currentScreen="report" setScreen={setScreen} />
    </div>
  )
}
