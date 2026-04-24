'use client'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  icon: string
}

export default function Toast({ message, type, icon }: ToastProps) {
  return (
    <div className="fixed top-6 left-6 right-6 max-w-sm z-50 toast-enter">
      <div
        className={`glass rounded-2xl p-4 flex items-center gap-3 glow-green ${
          type === 'success'
            ? 'border-[rgba(34,197,94,0.4)]'
            : 'border-[rgba(248,113,113,0.4)]'
        }`}
      >
        <span className="text-2xl flex-shrink-0">{icon}</span>
        <p className="text-sm font-medium text-[#F0FDF4] flex-1">{message}</p>
      </div>
    </div>
  )
}
