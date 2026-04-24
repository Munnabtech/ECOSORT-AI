'use client'

import { useState, useRef, useEffect } from 'react'
import LoginScreen from '@/components/screens/LoginScreen'
import DashboardScreen from '@/components/screens/DashboardScreen'
import ScanScreen from '@/components/screens/ScanScreen'
import ResultScreen from '@/components/screens/ResultScreen'
import HistoryScreen from '@/components/screens/HistoryScreen'
import ReportScreen from '@/components/screens/ReportScreen'
import ContactScreen from '@/components/screens/ContactScreen'
import TeamScreen from '@/components/screens/TeamScreen'
import Toast from '@/components/Toast'

export interface ScanResult {
  id: string
  timestamp: Date
  type: string
  confidence: number
  recyclable: boolean
  tips: string[]
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'dashboard' | 'scan' | 'result' | 'history' | 'report' | 'contact' | 'team'>('login')
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [selectedType, setSelectedType] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [scans, setScans] = useState<ScanResult[]>([])
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const modelRef = useRef<any>(null)
  const webcamRef = useRef<any>(null)

  // Load ML model on mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        const script = document.querySelector('script[src*="teachablemachine"]')
        if (!script?.hasAttribute('data-loaded')) {
          await new Promise(resolve => {
            const checkInterval = setInterval(() => {
              if (typeof (window as any).tmImage !== 'undefined') {
                clearInterval(checkInterval)
                resolve(true)
              }
            }, 100)
            setTimeout(() => clearInterval(checkInterval), 5000)
          })
        }

        const tm = (window as any).tmImage
        if (tm && !modelRef.current) {
          const URL = 'https://teachablemachine.withgoogle.com/models/sMXkD-kDf/'
          const modelURL = URL + 'model.json'
          const metadataURL = URL + 'metadata.json'
          const model = await tm.load(modelURL, metadataURL)
          modelRef.current = model
        }
      } catch (error) {
        console.log('[v0] Model load attempted (may fail if libraries unavailable)')
      }
    }

    loadModel()

    return () => {
      if (modelRef.current) {
        modelRef.current.dispose()
      }
    }
  }, [])

  const handleLogin = (name: string) => {
    setUserName(name)
    setIsLoggedIn(true)
    setCurrentScreen('dashboard')
    showToast(`Welcome ${name}!`, 'success')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName('')
    setCurrentScreen('login')
    setScans([])
    showToast('Logged out successfully', 'success')
  }

  const handleScan = (result: ScanResult) => {
    setScanResult(result)
    setScans([result, ...scans])
    setCurrentScreen('result')
    showToast('Scan completed!', 'success')
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} setScreen={setCurrentScreen} />
      case 'dashboard':
        return (
          <DashboardScreen
            userName={userName}
            scansCount={scans.length}
            setScreen={setCurrentScreen}
            onLogout={handleLogout}
          />
        )
      case 'scan':
        return (
          <ScanScreen
            setScreen={setCurrentScreen}
            onScan={handleScan}
            modelRef={modelRef}
          />
        )
      case 'result':
        return (
          <ResultScreen
            result={scanResult}
            setScreen={setCurrentScreen}
            onNewScan={() => setCurrentScreen('scan')}
          />
        )
      case 'history':
        return (
          <HistoryScreen
            scans={scans}
            setScreen={setCurrentScreen}
          />
        )
      case 'report':
        return (
          <ReportScreen
            scans={scans}
            setScreen={setCurrentScreen}
          />
        )
      case 'contact':
        return <ContactScreen setScreen={setCurrentScreen} showToast={showToast} />
      case 'team':
        return <TeamScreen setScreen={setCurrentScreen} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
      {toast && (
        <Toast message={toast.message} type={toast.type} />
      )}
    </div>
  )
}
