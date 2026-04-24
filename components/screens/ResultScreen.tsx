import { CheckCircle2, RotateCcw, Copy } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import type { ScanResult } from '@/app/page'

interface ResultScreenProps {
  result: ScanResult | null
  setScreen: (screen: string) => void
  onNewScan: () => void
}

export default function ResultScreen({ result, setScreen, onNewScan }: ResultScreenProps) {
  if (!result) {
    return <div className="min-h-screen bg-background" />
  }

  const recyclingIcon: Record<string, string> = {
    Paper: '📄',
    Plastic: '🧴',
    Glass: '🔴',
    Metal: '🥫',
    Organic: '🍌',
    Electronics: '📱',
  }

  const handleCopyInfo = () => {
    const text = `${result.type} - ${result.recyclable ? 'Recyclable' : 'Not Recyclable'} (${(result.confidence * 100).toFixed(1)}%)`
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-6 pt-6 pb-8 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Scan Results</h1>
        <p className="text-sm text-muted-foreground">
          {result.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Result Card */}
        <div className="bg-card rounded-3xl border-2 border-primary/20 p-8 text-center mb-6 animate-scaleIn">
          {/* Icon */}
          <div className="text-6xl mb-4">
            {recyclingIcon[result.type] || '🔍'}
          </div>

          {/* Type */}
          <h2 className="text-3xl font-bold text-foreground mb-2">{result.type}</h2>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">
              {result.recyclable ? 'Recyclable ♻️' : 'Not Recyclable'}
            </span>
          </div>

          {/* Confidence */}
          <div className="bg-primary/10 rounded-2xl p-4 mb-4">
            <p className="text-sm text-muted-foreground mb-2">Confidence</p>
            <div className="w-full bg-border rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-primary/60 h-full transition-all duration-500"
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>
            <p className="text-2xl font-bold text-primary mt-2">
              {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopyInfo}
            className="text-sm text-primary hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <Copy className="w-4 h-4" />
            Copy Result
          </button>
        </div>

        {/* Tips */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-foreground mb-3">Disposal Tips</h3>
          <div className="space-y-2">
            {result.tips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-4 border border-border flex items-start gap-3"
              >
                <span className="text-primary font-bold min-w-6">✓</span>
                <p className="text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onNewScan}
            className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg transition-all hover:shadow-lg active:scale-95"
          >
            📸 Scan Another Item
          </button>

          <button
            onClick={() => setScreen('dashboard')}
            className="w-full px-6 py-3 bg-card border border-border text-foreground rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Back to Dashboard
          </button>
        </div>
      </div>

      <BottomNav currentScreen="result" setScreen={setScreen} />
    </div>
  )
}
