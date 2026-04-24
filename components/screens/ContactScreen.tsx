import { useState } from 'react'
import { Send } from 'lucide-react'
import BottomNav from '@/components/BottomNav'

interface ContactScreenProps {
  setScreen: (screen: string) => void
  showToast: (message: string, type: 'success' | 'error') => void
}

export default function ContactScreen({ setScreen, showToast }: ContactScreenProps) {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !message.trim()) {
      showToast('Please fill in all fields', 'error')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      showToast('Message sent successfully! We&apos;ll get back to you soon.', 'success')
      setEmail('')
      setMessage('')
      setIsSubmitting(false)
      setScreen('dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-6 pt-6 pb-8 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Contact Us</h1>
        <p className="text-sm text-muted-foreground">We&apos;d love to hear from you</p>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        {/* Info Cards */}
        <div className="space-y-3 mb-8">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <p className="font-semibold text-foreground">support@ecosort.io</p>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Response Time</p>
            <p className="font-semibold text-foreground">Usually within 24 hours</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              rows={5}
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          <button
            type="button"
            onClick={() => setScreen('dashboard')}
            className="w-full px-6 py-3 bg-card border border-border text-foreground rounded-2xl font-semibold transition-all"
          >
            Back to Dashboard
          </button>
        </form>
      </div>

      <BottomNav currentScreen="contact" setScreen={setScreen} />
    </div>
  )
}
