'use client'

import { CheckCircle, Printer, Download } from 'lucide-react'

interface HotelTicketBannerProps {
  bookingRef: string
  email: string
  onPrint: () => void
  onDownload: () => void
}

export default function HotelTicketBanner({ bookingRef, email, onPrint, onDownload }: HotelTicketBannerProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-800">Booking Confirmed!</h1>
            <p className="text-sm text-green-700">
              Booking Reference: <span className="font-mono font-bold tracking-wider">{bookingRef}</span>
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              Confirmation sent to {email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-green-300 rounded-md text-sm font-medium text-green-700 hover:bg-green-100 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={onDownload}
            className="flex items-center gap-1.5 px-3 py-2 bg-green-600 rounded-md text-sm font-medium text-white hover:bg-green-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
