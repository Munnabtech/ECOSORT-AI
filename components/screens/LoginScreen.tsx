import { useState } from 'react'
import { Leaf } from 'lucide-react'

interface LoginScreenProps {
  onLogin: (name: string) => void
  setScreen: (screen: string) => void
}

export default function LoginScreen({ onLogin, setScreen }: LoginScreenProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    onLogin(name)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary/5 to-background">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center animate-scaleIn">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl p-8 shadow-lg border border-border">
          <h1 className="text-3xl font-bold text-foreground text-center mb-2">EcoSort</h1>
          <p className="text-center text-muted-foreground text-sm mb-8">
            AI-Powered Waste Classification
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setError('')
                }}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold transition-all hover:shadow-lg active:scale-95"
            >
              Let&apos;s Sort
            </button>
          </form>

          <div className="mt-6 p-4 bg-primary/10 rounded-2xl border border-primary/20">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Demo users:</span> Try &quot;Alex&quot;, &quot;Jordan&quot;, or &quot;Sam&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
