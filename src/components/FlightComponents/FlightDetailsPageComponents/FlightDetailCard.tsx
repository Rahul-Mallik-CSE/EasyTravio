import type { ReactNode } from 'react'

interface FlightDetailCardProps {
  children: ReactNode
}

export default function FlightDetailCard({ children }: FlightDetailCardProps) {
  return (
    <div className="bg-card w-full max-w-xl rounded-xl shadow-2xl overflow-hidden">
      {children}
    </div>
  )
}
