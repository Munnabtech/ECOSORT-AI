import { useEffect } from 'react'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
}

export default function Toast({ message, type }: ToastProps) {
  return (
    <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto z-50 animate-slideInDown">
      <div
        className={`rounded-2xl p-4 flex items-center gap-3 shadow-lg border ${
          type === 'success'
            ? 'bg-primary text-primary-foreground border-primary/30'
            : 'bg-destructive text-destructive-foreground border-destructive/30'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
        )}
        <p className="text-sm font-medium flex-1">{message}</p>
      </div>
    </div>
  )
}
