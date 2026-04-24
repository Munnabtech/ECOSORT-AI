import BottomNav from '@/components/BottomNav'

interface TeamScreenProps {
  setScreen: (screen: string) => void
}

export default function TeamScreen({ setScreen }: TeamScreenProps) {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      emoji: '👩‍💼',
      bio: 'Environmental engineer with 10+ years in waste management',
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO',
      emoji: '👨‍💻',
      bio: 'AI/ML specialist focused on computer vision',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Partnerships',
      emoji: '👩‍🤝‍👨',
      bio: 'Building connections with recycling organizations',
    },
    {
      name: 'David Kim',
      role: 'Product Designer',
      emoji: '🎨',
      bio: 'Creating delightful user experiences',
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/10 to-background px-6 pt-6 pb-8 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground">Meet the Team</h1>
        <p className="text-sm text-muted-foreground">The people behind EcoSort</p>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="space-y-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-card rounded-2xl p-6 border border-border animate-fadeInUp hover:border-primary transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{member.emoji}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="mt-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20 animate-fadeInUp">
          <h3 className="font-bold text-foreground text-lg mb-3">Our Mission</h3>
          <p className="text-foreground leading-relaxed">
            We&apos;re making waste sorting intelligent, accessible, and impactful. By combining AI and environmental science, we&apos;re helping millions reduce their environmental footprint one item at a time.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => setScreen('dashboard')}
          className="w-full mt-6 px-6 py-3 bg-card border border-border text-foreground rounded-2xl font-semibold transition-all"
        >
          Back to Dashboard
        </button>
      </div>

      <BottomNav currentScreen="team" setScreen={setScreen} />
    </div>
  )
}
