import React from 'react'
import Image from 'next/image'

const sectionTitle = "Make A Comprasion"

const comprasionData = [
  {
    id: 1,
    image: "/HotelImages/LandingPageImages/ComprasionImages/Photo Left.png",
    caption:
      "The Past Offers With The Highest Reviews Outshine Others, Standing As A Testament To Their Exceptional Quality.",
  },
  {
    id: 2,
    image: "/HotelImages/LandingPageImages/ComprasionImages/Photo Right.png",
    caption:
      "Ring In The New Year With Iconic Moments And Unforgettable Memories In New York City",
  },
]

const ComprasionSection = () => {
  return (
    <section className="w-full py-2 sm:py-4 md:py-6 bg-background">
      <div className="max-w-7xl px-4 sm:px-6 md:px-8 mx-auto">
        <h2 className="text-2xl md:text-[32px] font-extrabold text-primary mb-4 md:mb-6">
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {comprasionData.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-80 sm:h-90 md:h-100 rounded-sm overflow-hidden"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.caption}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />

              {/* Dark gradient overlay at bottom */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              {/* Caption text */}
              <p className="absolute bottom-0 left-0 right-0 px-4 py-4 text-white text-sm md:text-base font-semibold leading-snug">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ComprasionSection