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
  type: string
  confidence: number
  timestamp: string
  tips: string
}

export default function Home() {
  const [screen, setScreen] = useState<'login' | 'dashboard' | 'scan' | 'result' | 'history' | 'report' | 'contact' | 'team'>('login')
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [scans, setScans] = useState<ScanResult[]>([])
  const [userName, setUserName] = useState('Alex')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; icon: string } | null>(null)
  const [aiStatus, setAiStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  
  const modelRef = useRef<any>(null)
  const isModelLoading = useRef(false)

  // Load ML model on mount
  useEffect(() => {
    if (isModelLoading.current) return
    isModelLoading.current = true

    const loadModel = async () => {
      try {
        await new Promise(resolve => {
          const checkInterval = setInterval(() => {
            if (typeof (window as any).tmImage !== 'undefined' && typeof (window as any).tf !== 'undefined') {
              clearInterval(checkInterval)
              resolve(true)
            }
          }, 100)
          setTimeout(() => clearInterval(checkInterval), 5000)
        })

        const tm = (window as any).tmImage
        if (tm && !modelRef.current) {
          const modelURL = 'https://teachablemachine.withgoogle.com/models/-1r1FYZ48/model.json'
          const metadataURL = 'https://teachablemachine.withgoogle.com/models/-1r1FYZ48/metadata.json'
          const model = await tm.load(modelURL, metadataURL)
          modelRef.current = model
          setAiStatus('ready')
        }
      } catch (error) {
        console.log('[v0] Model load note - libraries may not be available in preview')
        setAiStatus('error')
      }
    }

    loadModel()
  }, [])

  const showToast = (message: string, type: 'success' | 'error', icon: string = '✓') => {
    setToast({ message, type, icon })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogin = (name: string) => {
    setUserName(name)
    setIsLoggedIn(true)
    setScreen('dashboard')
    showToast(`Welcome ${name}!`, 'success', '👋')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName('')
    setScreen('login')
    setScans([])
    showToast('Logged out successfully', 'success', '👋')
  }

  const renderScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} setScreen={setScreen} />
      case 'dashboard':
        return (
          <DashboardScreen
            userName={userName}
            scansCount={scans.length}
            setScreen={setScreen}
            onLogout={handleLogout}
          />
        )
      case 'scan':
        return (
          <ScanScreen
            setScreen={setScreen}
            setScanResult={setScanResult}
            setScans={setScans}
            scans={scans}
            modelRef={modelRef}
            aiStatus={aiStatus}
            showToast={showToast}
          />
        )
      case 'result':
        return (
          <ResultScreen
            result={scanResult}
            setScreen={setScreen}
          />
        )
      case 'history':
        return (
          <HistoryScreen
            scans={scans}
            setScreen={setScreen}
            setScanResult={setScanResult}
          />
        )
      case 'report':
        return (
          <ReportScreen
            setScreen={setScreen}
            showToast={showToast}
          />
        )
      case 'contact':
        return <ContactScreen setScreen={setScreen} showToast={showToast} />
      case 'team':
        return <TeamScreen setScreen={setScreen} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {renderScreen()}
      {toast && (
        <Toast message={toast.message} type={toast.type} icon={toast.icon} />
      )}
    </div>
  )
}
