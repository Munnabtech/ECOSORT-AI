'use client'

import { Home, Camera, Clock, BarChart3, MessageCircle, Users } from 'lucide-react'

interface BottomNavProps {
  currentScreen: string
  setScreen: (screen: string) => void
}

export default function BottomNav({ currentScreen, setScreen }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'scan', label: 'Scan', icon: Camera },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'report', label: 'Report', icon: BarChart3 },
    { id: 'contact', label: 'Contact', icon: MessageCircle },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-[rgba(255,255,255,0.08)] backdrop-blur-xl px-2 py-3 z-40">
      <div className="flex items-center justify-between max-w-full overflow-x-auto gap-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all flex-1 min-w-fit relative ${
                isActive
                  ? 'text-[#22C55E]'
                  : 'text-[rgba(110,231,183,0.6)] hover:text-[#6EE7B7]'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <div className="absolute bottom-0 w-1 h-1 bg-[#22C55E] rounded-full mt-1 glow-green-sm" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
