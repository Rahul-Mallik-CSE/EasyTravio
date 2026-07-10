import Image from 'next/image'

interface FlightGalleryCardProps {
  image: string
  alt: string
}

const FlightGalleryCard = ({ image, alt }: FlightGalleryCardProps) => {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-white/80 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/18 via-transparent to-transparent" />
      </div>
    </article>
  )
}

export default FlightGalleryCard