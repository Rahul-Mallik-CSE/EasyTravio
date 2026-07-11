import type { FlightDetail } from '@/types/FlightDetailTypes'

interface FlightDetailPricingProps {
  flight: FlightDetail
}

export default function FlightDetailPricing({ flight }: FlightDetailPricingProps) {
  return (
    <div className="px-5 pb-0">
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-theme">${flight.price}</p>
          <p className="text-xs text-secondary mt-0.5">Taxes included</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 opacity-80">
            <div className="w-10 h-6 bg-[#EB001B] rounded-sm relative overflow-hidden flex items-center justify-center">
              <div className="absolute w-6 h-6 rounded-full bg-[#F79E1B] right-1" />
              <div className="absolute w-6 h-6 rounded-full bg-[#EB001B] left-1" />
              <div className="absolute w-4 h-4 rounded-full bg-[#FF5F00] z-10" />
            </div>
            <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-sm italic">VISA</div>
            <div className="bg-blue-800 text-white text-xs font-bold px-1 py-1 rounded-sm leading-tight text-center">
              <span className="text-blue-300">Amex</span>
            </div>
            <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-sm italic">Pay<span className="text-blue-200">Pal</span></div>
          </div>
        </div>
      </div>

      <p className="text-xs text-secondary text-right mb-4">Transactions Are Encrypted By EasyTravio</p>
    </div>
  )
}
