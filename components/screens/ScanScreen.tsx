import { useState, useRef, useEffect } from 'react'
import { Camera, RotateCcw, Zap } from 'lucide-react'
import BottomNav from '@/components/BottomNav'
import type { ScanResult } from '@/app/page'

interface ScanScreenProps {
  setScreen: (screen: string) => void
  onScan: (result: ScanResult) => void
  modelRef: React.MutableRefObject<any>
}

export default function ScanScreen({ setScreen, onScan, modelRef }: ScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [useCamera, setUseCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedManually, setSelectedManually] = useState(false)

  const wasteTypes = [
    { name: 'Paper', recyclable: true, icon: '📄' },
    { name: 'Plastic', recyclable: true, icon: '🧴' },
    { name: 'Glass', recyclable: true, icon: '🔴' },
    { name: 'Metal', recyclable: true, icon: '🥫' },
    { name: 'Organic', recyclable: false, icon: '🍌' },
    { name: 'Electronics', recyclable: false, icon: '📱' },
  ]

  const tips: Record<string, string[]> = {
    Paper: ['Flatten boxes', 'Keep dry', 'No plastic coating'],
    Plastic: ['Remove caps', 'Rinse bottles', 'Check #1 or #2'],
    Glass: ['Rinse clean', 'Remove labels', 'Separate colors'],
    Metal: ['Crush cans', 'Remove labels', 'Keep dry'],
    Organic: ['Use compost bin', 'No meat/dairy', 'Break into pieces'],
    Electronics: ['Find e-waste center', 'Keep dry', 'Extract batteries'],
  }

  useEffect(() => {
    if (useCamera) {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [useCamera])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.log('[v0] Camera access denied or unavailable')
      setUseCamera(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  const captureAndProcess = async () => {
    if (!canvasRef.current || !videoRef.current) return

    setIsScanning(true)
    const ctx = canvasRef.current.getContext('2d')
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

      if (modelRef.current) {
        try {
          const predictions = await modelRef.current.predict(canvasRef.current)
          const bestPrediction = predictions.reduce((best: any, current: any) =>
            current.probability > best.probability ? current : best
          )

          const wasteType = bestPrediction.className.split(' ')[0]
          handleScanComplete(wasteType, bestPrediction.probability)
        } catch (error) {
          console.log('[v0] Model prediction failed, using manual fallback')
          setUseCamera(false)
          setIsScanning(false)
        }
      } else {
        setUseCamera(false)
        setIsScanning(false)
      }
    }
  }

  const handleManualSelection = (type: string) => {
    handleScanComplete(type, 0.85 + Math.random() * 0.15)
  }

  const handleScanComplete = (type: string, confidence: number) => {
    const wasteItem = wasteTypes.find(w => w.name === type) || wasteTypes[0]

    const result: ScanResult = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: wasteItem.name,
      confidence: parseFloat(confidence.toFixed(3)),
      recyclable: wasteItem.recyclable,
      tips: tips[wasteItem.name] || [],
    }

    setUseCamera(false)
    setIsScanning(false)
    onScan(result)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-6 pt-6 pb-8 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Scan Waste Item</h1>
          <button
            onClick={() => setScreen('dashboard')}
            className="px-4 py-2 hover:bg-muted rounded-xl transition-colors text-foreground"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Point your camera at the item or select manually
        </p>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {!useCamera ? (
          <>
            {/* Camera Toggle */}
            {!selectedManually && (
              <button
                onClick={() => setUseCamera(true)}
                className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold flex items-center justify-center gap-2 mb-6 transition-all hover:shadow-lg active:scale-95 animate-slideInUp"
              >
                <Camera className="w-5 h-5" />
                Use Camera to Scan
              </button>
            )}

            {/* Manual Selection */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-4">Or select manually:</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {wasteTypes.map(type => (
                  <button
                    key={type.name}
                    onClick={() => {
                      setSelectedManually(true)
                      handleManualSelection(type.name)
                    }}
                    disabled={isScanning}
                    className="p-4 bg-card border-2 border-border rounded-2xl text-center transition-all hover:border-primary hover:bg-primary/5 active:scale-95 disabled:opacity-50"
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <p className="font-medium text-foreground text-sm">{type.name}</p>
                    {type.recyclable && (
                      <p className="text-xs text-primary mt-1">♻️ Recyclable</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Camera Preview */}
            <div className="mb-6 rounded-2xl overflow-hidden border-2 border-primary bg-black aspect-video flex items-center justify-center relative animate-scaleIn">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hidden Canvas */}
            <canvas ref={canvasRef} className="hidden" width="224" height="224" />

            {/* Capture Button */}
            <button
              onClick={captureAndProcess}
              disabled={isScanning}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold flex items-center justify-center gap-2 mb-3 transition-all hover:shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <Zap className="w-5 h-5 animate-pulse" />
                  Processing...
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  Capture Photo
                </>
              )}
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setUseCamera(false)}
              className="w-full px-6 py-3 bg-card border border-border text-foreground rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Back
            </button>
          </>
        )}
      </div>

      <BottomNav currentScreen="scan" setScreen={setScreen} />
    </div>
  )
}
