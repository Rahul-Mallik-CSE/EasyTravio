'use client'

import { useRouter } from 'next/navigation'
import { Search, Printer, Download } from 'lucide-react'

interface HotelTicketActionsProps {
  onPrint: () => void
  onDownload: () => void
  onSearchMore: () => void
}

export default function HotelTicketActions({ onPrint, onDownload, onSearchMore }: HotelTicketActionsProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
      <button
        onClick={onSearchMore}
        className="flex items-center gap-2 bg-theme text-white px-6 py-3 rounded-sm font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer"
      >
        <Search className="w-4 h-4" />
        Search More Hotels
      </button>
      <button
        onClick={onPrint}
        className="flex items-center gap-2 border border-border bg-white text-secondary px-6 py-3 rounded-sm font-bold text-sm hover:border-theme hover:text-theme transition-colors cursor-pointer"
      >
        <Printer className="w-4 h-4" />
        Print Ticket
      </button>
      <button
        onClick={onDownload}
        className="flex items-center gap-2 border border-border bg-white text-secondary px-6 py-3 rounded-sm font-bold text-sm hover:border-theme hover:text-theme transition-colors cursor-pointer"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </button>
    </div>
  )
}
