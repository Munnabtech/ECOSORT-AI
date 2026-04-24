'use client'

import { useState } from 'react'
import BottomNav from '@/components/BottomNav'

interface ContactScreenProps {
  setScreen: (screen: string) => void
  showToast: (msg: string, type: 'success' | 'error', icon: string) => void
}

export default function ContactScreen({ setScreen, showToast }: ContactScreenProps) {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<string[]>(['👋 Hi! I&apos;m EcoBot. How can I help you today?'])

  const contacts = [
    { icon: '📞', label: 'Call Us', value: '+91 98765 43210', action: () => window.open('tel:+919876543210') },
    { icon: '📧', label: 'Email Us', value: 'support@ecosort.ai', action: () => window.open('mailto:support@ecosort.ai') },
    { icon: '💬', label: 'Live Chat', value: 'Available 9AM–6PM', action: () => setChatOpen(!chatOpen) },
  ]

  const faqs = [
    { q: 'How does waste scanning work?', a: 'Upload a photo, AI analyzes it instantly, get disposal instructions.' },
    { q: 'What if scan result is wrong?', a: 'Use manual selection below upload as reliable fallback.' },
    { q: 'How to report a missed pickup?', a: 'Open Report screen, select Missed Pickup, submit.' },
  ]

  return (
    <div className="min-h-screen pb-24 screen-enter">
      {/* Header */}
      <div className="glass border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => setScreen('dashboard')} className="text-[#6EE7B7]">← Back</button>
          <h1 className="font-heading font-bold text-[#F0FDF4]">Contact Support</h1>
          <div className="w-6" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Contact Cards */}
        <div className="grid grid-cols-3 gap-2">
          {contacts.map((contact, i) => (
            <button
              key={i}
              onClick={contact.action}
              className="glass rounded-xl p-3 text-center hover:border-[#22C55E] hover:shadow-[0_0_16px_rgba(34,197,94,0.4)] transition-all"
            >
              <div className="text-2xl mb-1">{contact.icon}</div>
              <p className="text-[#F0FDF4] font-semibold text-xs">{contact.label}</p>
              <p className="text-[#6EE7B7] text-xs mt-1 line-clamp-2">{contact.value}</p>
            </button>
          ))}
        </div>

        {/* Chat UI */}
        {chatOpen && (
          <div className="glass rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                <span className="font-semibold text-[#F0FDF4]">EcoBot</span>
                <span className="w-2 h-2 bg-[#22C55E] rounded-full glow-green-sm" />
              </div>
              <button onClick={() => setChatOpen(false)} className="text-[#6EE7B7]">✕</button>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.02)] rounded-lg p-3 space-y-2 max-h-40 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <p key={i} className="text-[#F0FDF4] text-sm">{msg}</p>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {['Scan Help', 'Report Issue', 'Pickup Info'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setChatMessages([...chatMessages, `You: ${opt}`, opt === 'Scan Help' ? 'Upload photos, AI detects instantly! 🤖' : opt === 'Report Issue' ? 'Use Report screen, fill form, submit. ✅' : 'Mon-Sat 7AM-10AM in your area. ♻️'])}
                  className="px-2 py-1 glass rounded-full text-xs text-[#6EE7B7] hover:text-[#22C55E]"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div>
          <p className="section-label mb-3">Frequently Asked</p>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details key={i} className="glass rounded-lg p-4 group">
                <summary className="font-semibold text-[#F0FDF4] cursor-pointer">
                  {faq.q}
                </summary>
                <p className="text-[#6EE7B7] text-sm mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <p className="section-label mb-3">Follow our mission 🌍</p>
          <div className="flex gap-2">
            {[{ icon: '𝕏', url: 'https://twitter.com' }, { icon: '📷', url: 'https://instagram.com' }, { icon: '💼', url: 'https://linkedin.com' }, { icon: '▶️', url: 'https://youtube.com' }].map((social, i) => (
              <button
                key={i}
                onClick={() => window.open(social.url)}
                className="glass rounded-lg p-3 flex-1 hover:border-[#22C55E]"
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav currentScreen="contact" setScreen={setScreen} />
    </div>
  )
}
