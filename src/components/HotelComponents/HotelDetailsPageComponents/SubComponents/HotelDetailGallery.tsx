'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronRight, Camera } from 'lucide-react'

interface HotelDetailGalleryProps {
  gallery: string[]
  hotelName: string
}

const HotelDetailGallery: React.FC<HotelDetailGalleryProps> = ({ gallery, hotelName }) => {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="relative">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-sm overflow-hidden h-64 md:h-80">
        {/* Main Image */}
        <div className="col-span-2 row-span-2 relative overflow-hidden">
          <Image
            src={gallery[0]}
            alt={hotelName}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>

        {/* Side Images */}
        {gallery.slice(1, 5).map((img, i) => (
          <div key={i} className="relative overflow-hidden hidden md:block">
            <Image
              src={img}
              alt={`${hotelName} ${i + 2}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}

        {/* See More Photos Button */}
        {gallery.length > 1 && (
          <button
            onClick={() => setShowAll(true)}
            className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-black/80 transition-colors cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            See More Photos &gt;
          </button>
        )}
      </div>

      {/* Lightbox */}
      {showAll && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setShowAll(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer z-10"
          >
            <ChevronRight className="w-8 h-8 rotate-45" />
          </button>

          <div className="relative max-w-4xl w-full h-[80vh]">
            <Image
              src={gallery[0]}
              alt={hotelName}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {gallery.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelDetailGallery
