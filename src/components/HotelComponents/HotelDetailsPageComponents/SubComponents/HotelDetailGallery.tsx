'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Camera } from 'lucide-react'

interface HotelDetailGalleryProps {
  gallery: string[]
  hotelName: string
}

const HotelDetailGallery: React.FC<HotelDetailGalleryProps> = ({ gallery, hotelName }) => {
  const [showAll, setShowAll] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length)
  }

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

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
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setShowAll(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium z-20 bg-white/10 px-3 py-1 rounded-full">
            {currentIndex + 1} / {gallery.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 cursor-pointer z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Current Image */}
          <div className="relative w-full max-w-5xl h-[80vh] px-16">
            <Image
              src={gallery[currentIndex]}
              alt={`${hotelName} ${currentIndex + 1}`}
              fill
              className="object-contain transition-opacity duration-300"
              key={currentIndex}
            />
          </div>

          {/* Next Button */}
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 cursor-pointer z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 max-w-[90vw] overflow-x-auto px-4 py-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative w-16 h-12 rounded-sm overflow-hidden shrink-0 cursor-pointer transition-all duration-200 ${
                  i === currentIndex
                    ? 'ring-2 ring-white opacity-100'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelDetailGallery
