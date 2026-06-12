import Image from 'next/image'
import React from 'react'

const banners = [
  {
    src: '/HotelImages/LandingPageImages/BannerImages/Banner1.png',
    alt: 'Stadium crowd cheering',
    text: 'Reserve Your Hotel, Pursue Your Team',
    row: 1,
  },
  {
    src: '/HotelImages/LandingPageImages/BannerImages/Banner2.png',
    alt: 'Tropical resort pool with ocean view',
    text: 'Subscribe Our Newsletter',
    row: 1,
  },
  {
    src: '/HotelImages/LandingPageImages/BannerImages/Banner3.png',
    alt: 'Cliffside villa with infinity pool',
    text: 'Review Hotel Services Worldwide',
    row: 2,
  },
  {
    src: '/HotelImages/LandingPageImages/BannerImages/Banner4.png',
    alt: 'Social media on smartphone',
    text: 'Follow The Latest Tour News',
    row: 2,
  },
]

const BannerSection = () => {
  return (
    <section className="w-full py-2 sm:py-4 md:py-6 bg-background">
      <div className="max-w-7xl px-4 sm:px-6 md:px-8 mx-auto">
            {/* Row 1 */}
            <div className="flex flex-col sm:flex-row gap-2 mb-2">
                {banners
                .filter((b) => b.row === 1)
                .map((banner) => (
                    <div
                    key={banner.text}
                    className="relative w-full sm:w-1/2 h-50 sm:h-76 md:h-86.5 rounded-xl overflow-hidden"
                    >
                    
                    <Image
                        src={banner.src}
                        alt={banner.alt}
                        fill    
                        className="object-cover object-center"
                    />
                    {/* Dark gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    {/* Text */}
                    <p className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg sm:text-xl md:text-2xl leading-snug">
                        {banner.text}
                    </p>
                    </div>
                ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-col sm:flex-row gap-2">
                {banners
                .filter((b) => b.row === 2)
                .map((banner) => (
                    <div
                    key={banner.text}
                    className="relative w-full sm:w-1/2 h-50 sm:h-55 md:h-65.25 rounded-xl overflow-hidden"
                    >
                    <Image
                        src={banner.src}
                        alt={banner.alt}
                        fill    
                        className="object-cover object-center"
                    />
                    {/* Dark gradient overlay at bottom */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                    {/* Text */}
                    <p className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg sm:text-xl md:text-2xl leading-snug">
                        {banner.text}
                    </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default BannerSection