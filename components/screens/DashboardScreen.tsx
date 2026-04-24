import { Leaf, LogOut } from 'lucide-react'
import BottomNav from '@/components/BottomNav'

interface DashboardScreenProps {
  userName: string
  scansCount: number
  setScreen: (screen: string) => void
  onLogout: () => void
}

export default function DashboardScreen({
  userName,
  scansCount,
  setScreen,
  onLogout,
}: DashboardScreenProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-6 pt-6 pb-8 border-b border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome, {userName}!</h1>
              <p className="text-sm text-muted-foreground">Ready to sort?</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-6 border border-border text-center animate-fadeInUp">
            <div className="text-4xl font-bold text-primary mb-2">{scansCount}</div>
            <p className="text-sm text-muted-foreground">Items Scanned</p>
          </div>
          <div className="bg-card rounded-2xl p-6 border border-border text-center animate-fadeInUp">
            <div className="text-4xl font-bold text-primary mb-2">
              {scansCount > 0 ? Math.round((scansCount / (scansCount + 5)) * 100) : 0}%
            </div>
            <p className="text-sm text-muted-foreground">Recyclable</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button
            onClick={() => setScreen('scan')}
            className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl font-bold text-lg transition-all hover:shadow-lg active:scale-95 animate-slideInUp"
          >
            📸 Scan Item
          </button>

          {scansCount > 0 && (
            <>
              <button
                onClick={() => setScreen('history')}
                className="w-full px-6 py-4 bg-card border border-border text-foreground rounded-2xl font-semibold transition-all hover:bg-muted active:scale-95 animate-slideInUp"
              >
                📋 View History
              </button>
              <button
                onClick={() => setScreen('report')}
                className="w-full px-6 py-4 bg-card border border-border text-foreground rounded-2xl font-semibold transition-all hover:bg-muted active:scale-95 animate-slideInUp"
              >
                📊 View Report
              </button>
            </>
          )}

          <button
            onClick={() => setScreen('contact')}
            className="w-full px-6 py-4 bg-card border border-border text-foreground rounded-2xl font-semibold transition-all hover:bg-muted active:scale-95 animate-slideInUp"
          >
            💬 Contact Us
          </button>

          <button
            onClick={() => setScreen('team')}
            className="w-full px-6 py-4 bg-card border border-border text-foreground rounded-2xl font-semibold transition-all hover:bg-muted active:scale-95 animate-slideInUp"
          >
            👥 Meet the Team
          </button>
        </div>
      </div>

      <BottomNav currentScreen="dashboard" setScreen={setScreen} />
    </div>
  )
}
