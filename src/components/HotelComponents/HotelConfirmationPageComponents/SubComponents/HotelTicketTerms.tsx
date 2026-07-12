'use client'

export default function HotelTicketTerms() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Terms And Conditions</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Payments</h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-secondary leading-relaxed">
              <span className="text-theme font-bold shrink-0 mt-0.5">•</span>
              <span>If you are booking as a residential guest, payment for your full stay will be collected upon arrival at the hotel.</span>
            </li>
            <li className="flex gap-3 text-sm text-secondary leading-relaxed">
              <span className="text-theme font-bold shrink-0 mt-0.5">•</span>
              <span>Your credit card will only be used to guarantee your booking. The full amount will be charged at the hotel during check-in or check-out.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Cancellation</h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-secondary leading-relaxed">
              <span className="text-theme font-bold shrink-0 mt-0.5">•</span>
              <span>Free cancellation is available up to 48 hours before check-in. After that, the first night will be charged.</span>
            </li>
            <li className="flex gap-3 text-sm text-secondary leading-relaxed">
              <span className="text-theme font-bold shrink-0 mt-0.5">•</span>
              <span>No-show reservations will be charged the full amount of the stay.</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-foreground mb-3">Check-in / Check-out</h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-secondary leading-relaxed">
              <span className="text-theme font-bold shrink-0 mt-0.5">•</span>
              <span>Check-in time is from 3:00 PM. Early check-in is subject to availability.</span>
            </li>
            <li className="flex gap-3 text-sm text-secondary leading-relaxed">
              <span className="text-theme font-bold shrink-0 mt-0.5">•</span>
              <span>Check-out time is until 11:00 AM. Late check-out may be available upon request.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
