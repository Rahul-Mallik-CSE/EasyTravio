'use client'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function FlightDetailBackButton() {
  const router = useRouter()

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 pt-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-white bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium hover:bg-black/50 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to results
      </button>
    </div>
  )
}
