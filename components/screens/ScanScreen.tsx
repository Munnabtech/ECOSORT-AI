'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, X, Zap } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import type { ScanResult } from '@/app/page'

interface ScanScreenProps {
  setScreen: (screen: string) => void
  setScanResult: (result: ScanResult) => void
  setScans: (scans: ScanResult[]) => void
  scans: ScanResult[]
  modelRef: React.MutableRefObject<any>
  aiStatus: 'loading' | 'ready' | 'error'
  showToast: (msg: string, type: 'success' | 'error', icon: string) => void
}

const wasteTypes = [
  { name: 'Plastic', icon: '🧴', color: 'from-blue-500 to-cyan-500' },
  { name: 'Paper', icon: '📄', color: 'from-yellow-500 to-orange-500' },
  { name: 'Metal', icon: '🥫', color: 'from-gray-500 to-slate-500' },
  { name: 'Glass', icon: '🔴', color: 'from-green-500 to-teal-500' },
  { name: 'Organic', icon: '🍃', color: 'from-green-500 to-emerald-500' },
  { name: 'E-Waste', icon: '💡', color: 'from-purple-500 to-pink-500' },
]

export default function ScanScreen({
  setScreen,
  setScanResult,
  setScans,
  scans,
  modelRef,
  aiStatus,
  showToast,
}: ScanScreenProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)

    const reader = new FileReader()
    reader.onload = async (event) => {
      const img = new Image()
      img.onload = async () => {
        if (canvasRef.current && modelRef.current) {
          const ctx = canvasRef.current.getContext('2d')
          canvasRef.current.width = 224
          canvasRef.current.height = 224
          ctx?.drawImage(img, 0, 0, 224, 224)

          try {
            const predictions = await modelRef.current.predict(canvasRef.current)
            const best = predictions.reduce((a: any, b: any) => 
              a.probability > b.probability ? a : b
            )
            const type = best.className.split(' ')[0]
            const result: ScanResult = {
              id: Date.now().toString(),
              type,
              confidence: Math.round(best.probability * 100) / 100,
              timestamp: new Date().toLocaleString(),
              tips: `Proper recycling instructions for ${type}`
            }
            setScanResult(result)
            setScans([result, ...scans])
            setScreen('result')
            showToast('Scan completed!', 'success', '✅')
          } catch (err) {
            showToast('Detection failed, try manual selection', 'error', '⚠️')
            setIsProcessing(false)
          }
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleManualSelect = (type: string) => {
    const result: ScanResult = {
      id: Date.now().toString(),
      type,
      confidence: 0.92,
      timestamp: new Date().toLocaleString(),
      tips: `Proper recycling instructions for ${type}`
    }
    setScanResult(result)
    setScans([result, ...scans])
    setScreen('result')
    showToast('Selection recorded!', 'success', '✅')
  }

  return (
    <div className="min-h-screen pb-24 screen-enter">
      {/* Header */}
      <div className="glass border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => setScreen('dashboard')} className="text-[#6EE7B7]">← Back</button>
          <h1 className="font-heading font-bold text-[#F0FDF4]">Scan Waste</h1>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
            aiStatus === 'ready' 
              ? 'bg-[rgba(34,197,94,0.1)] text-[#22C55E]' 
              : 'bg-[rgba(255,152,0,0.1)] text-[#FFB74D]'
          }`}>
            <span className={aiStatus === 'ready' ? 'animate-pulse' : 'animate-pulse opacity-50'}>●</span>
            {aiStatus === 'ready' ? 'AI Ready' : 'AI Loading...'}
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Upload Zone */}
        <div className="glass-thick rounded-2xl p-8 border-2 border-dashed border-[rgba(34,197,94,0.3)] glow-green-lg text-center mb-8 cursor-pointer hover:border-[rgba(34,197,94,0.6)] transition-all group"
          onClick={() => fileInputRef.current?.click()}>
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📷</div>
          <p className="text-[#F0FDF4] font-semibold mb-1">Drop your waste image here</p>
          <p className="text-[#6EE7B7] text-sm mb-4">or tap to upload</p>
          <button className="btn-primary text-sm">Choose Image</button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {isProcessing && (
          <div className="glass rounded-2xl p-4 text-center mb-6 glow-green">
            <Zap className="w-6 h-6 text-[#22C55E] mx-auto mb-2 animate-pulse" />
            <p className="text-[#F0FDF4] font-semibold">🤖 AI is scanning...</p>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[rgba(34,197,94,0.2)]" />
          <span className="text-[#6EE7B7] text-xs">or select type manually</span>
          <div className="flex-1 h-px bg-[rgba(34,197,94,0.2)]" />
        </div>

        {/* Manual Selection */}
        <p className="section-label mb-4">Waste Types</p>
        <div className="grid grid-cols-3 gap-3">
          {wasteTypes.map((type) => (
            <button
              key={type.name}
              onClick={() => handleManualSelect(type.name)}
              disabled={isProcessing}
              className="glass rounded-xl p-3 text-center group hover:border-[#22C55E] hover:shadow-[0_0_16px_rgba(34,197,94,0.4)] transition-all disabled:opacity-50"
            >
              <div className="text-2xl mb-1 group-hover:scale-125 transition-transform">{type.icon}</div>
              <p className="text-[#F0FDF4] font-semibold text-xs">{type.name}</p>
            </button>
          ))}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <BottomNav currentScreen="scan" setScreen={setScreen} />
    </div>
  )
}
