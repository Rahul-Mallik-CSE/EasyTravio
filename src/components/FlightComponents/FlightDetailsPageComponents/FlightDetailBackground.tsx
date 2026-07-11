import Image from 'next/image'

export default function FlightDetailBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
        alt="Flight background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
