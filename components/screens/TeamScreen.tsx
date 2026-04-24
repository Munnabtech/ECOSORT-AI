'use client'

import BottomNav from '@/components/BottomNav'

interface TeamScreenProps {
  setScreen: (screen: string) => void
}

const teamMembers = [
  { name: 'PRANEESH', role: 'Team Lead & ML Engineer', avatar: 'P', phone: '7337047907' },
  { name: 'SAI TEJESH', role: 'Frontend Developer', avatar: 'ST', phone: '9391026699' },
  { name: 'ANUJ OLEKAR', role: 'Backend & Integration', avatar: 'AO', phone: '9148218963' },
]

const colors = [
  'from-[#22C55E] to-[#10B981]',
  'from-[#10B981] to-[#059669]',
  'from-[#059669] to-[#047857]',
]

export default function TeamScreen({ setScreen }: TeamScreenProps) {
  return (
    <div className="min-h-screen pb-24 screen-enter">
      {/* Header */}
      <div className="glass border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <button onClick={() => setScreen('dashboard')} className="text-[#6EE7B7]">← Back</button>
          <h1 className="font-heading font-bold text-[#F0FDF4]">Meet Our Team</h1>
          <div className="w-6" />
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Intro */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 glass rounded-full border border-[rgba(34,197,94,0.3)] mb-3">
            <span className="section-label">👥 The Builders</span>
          </div>
          <h2 className="font-heading text-3xl font-bold text-[#F0FDF4] mb-2">Minds Behind<br/>EcoSort AI</h2>
          <p className="text-[#6EE7B7] text-sm">Built with passion for a cleaner tomorrow 🌿</p>
        </div>

        {/* Team Cards */}
        <div className="space-y-4 mb-8">
          {teamMembers.map((member, i) => (
            <div key={member.name} className="glass-thick rounded-2xl p-6 glow-green-lg flex items-center gap-6">
              {/* Avatar */}
              <div className={`w-16 h-16 bg-gradient-to-br ${colors[i]} rounded-2xl flex items-center justify-center text-white font-heading font-bold text-xl flex-shrink-0`}>
                {member.avatar}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-heading text-xl font-bold text-[#F0FDF4] mb-1">{member.name}</h3>
                <p className="text-[#6EE7B7] text-sm mb-3">{member.role}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">📞</span>
                  <span className="stat-number text-xs">{member.phone}</span>
                </div>
                <button
                  onClick={() => window.open(`tel:${member.phone}`)}
                  className="btn-primary text-xs py-1 px-3"
                >
                  Call Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="glass-thick rounded-2xl p-6 glow-green-lg border-b-4 border-b-[#22C55E] text-center">
          <p className="text-2xl mb-2">❝</p>
          <p className="text-[#F0FDF4] font-semibold mb-2">Together we sort,<br/>together we save.</p>
          <p className="text-[#6EE7B7] text-sm">— Team EcoSort AI, Hackathon 2025 🏆</p>
        </div>
      </div>

      <BottomNav currentScreen="team" setScreen={setScreen} />
    </div>
  )
}
