'use client'

import { useState } from 'react'
import { ArrowRight, Hexagon } from 'lucide-react'

interface LoginScreenProps {
  onLogin: (name: string) => void
  setScreen: (screen: string) => void
}

const demoUsers = ['PRANEESH', 'SAI TEJESH', 'ANUJ OLEKAR']

export default function LoginScreen({ onLogin, setScreen }: LoginScreenProps) {
  const [userName, setUserName] = useState('')
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim()) {
      onLogin(userName)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="particle fixed pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Login Card */}
      <div className="glass-thick rounded-3xl w-full max-w-md p-8 glow-green-lg screen-enter relative z-10">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#22C55E] to-[#10B981] rounded-2xl flex items-center justify-center">
              <Hexagon className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="font-heading text-3xl font-bold text-[#F0FDF4] mb-1">
            EcoSort<span className="text-[#22C55E]">AI</span>
          </h1>
          <p className="text-[#6EE7B7] text-sm">Smart Waste. Smarter Planet.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8 bg-[rgba(255,255,255,0.02)] p-1 rounded-full">
          {(['login', 'register'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full font-medium transition-all text-sm uppercase tracking-wider ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#22C55E] to-[#10B981] text-white'
                  : 'text-[#6EE7B7] hover:text-white'
              }`}
            >
              {tab === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass text-[#F0FDF4] placeholder-[rgba(110,231,183,0.5)] focus:border-[#22C55E] focus:shadow-[0_0_0_3px_rgba(34,197,94,0.15)] outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            Login <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Continue as Guest */}
        <button
          onClick={() => onLogin('Guest')}
          className="btn-ghost w-full mb-8"
        >
          Continue as Guest
        </button>

        {/* Demo Users */}
        <div className="mb-6">
          <p className="section-label text-center mb-3">Demo Users</p>
          <div className="space-y-2">
            {demoUsers.map((user) => (
              <button
                key={user}
                onClick={() => onLogin(user)}
                className="w-full px-3 py-2 text-sm glass rounded-lg hover:border-[#22C55E] hover:shadow-[0_0_16px_rgba(34,197,94,0.4)] transition-all text-[#6EE7B7] hover:text-white"
              >
                👤 {user}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[rgba(110,231,183,0.5)]">
          Powered by EcoSort AI © 2025
        </div>
      </div>
    </div>
  )
}
