import Image from 'next/image'
import type { FlightDetail } from '@/types/FlightDetailTypes'

interface FlightDetailHeroImageProps {
  flight: FlightDetail
}

export default function FlightDetailHeroImage({ flight }: FlightDetailHeroImageProps) {
  return (
    <div className="relative w-full h-48">
      <Image
        src={flight.imageUrl}
        alt={`${flight.airline} flight view`}
        fill
        sizes="600px"
        style={{ objectFit: 'cover' }}
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  )
}
