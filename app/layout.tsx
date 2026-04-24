import type { Metadata } from 'next'
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: '--font-jakarta' });

export const metadata: Metadata = {
  title: 'EcoSort - AI-Powered Waste Classification',
  description: 'Intelligent waste sorting with AI. Scan waste items and get instant classifications, reports, and environmental impact tracking.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: 'EcoSort - AI-Powered Waste Classification',
    description: 'Intelligent waste sorting with AI. Make a difference in environmental sustainability.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${_plusJakartaSans.variable}`}>
      <head>
        <script async src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4"></script>
        <script async src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8"></script>
      </head>
      <body className="font-jakarta antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
