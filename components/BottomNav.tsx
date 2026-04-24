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
    { id: 'team', label: 'Team', icon: Users },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-3">
      <div className="flex items-center justify-between max-w-full overflow-x-auto">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all flex-1 min-w-fit ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
