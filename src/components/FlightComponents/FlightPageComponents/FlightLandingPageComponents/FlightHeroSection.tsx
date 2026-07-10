import React from 'react'
import Image from 'next/image'
import ContentContainer from '@/components/CommonComponents/ContentContainer'
import { flightHeroImage } from '@/data/FlightLandingPageData'

const FlightHeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-h-60 sm:max-h-70 md:max-h-86 lg:max-h-100">
        {/* Background image with gradient overlay and content container for the hero section of the flight landing page. The image is responsive and covers the entire section, with a linear gradient overlay to enhance text readability. The content container holds the title, subtitle, and description of the hero section, which are styled for different screen sizes. */}
        <Image
          src={flightHeroImage}
          alt="Flight hero banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#03141f]/82 via-[#03141f]/52 to-[#03141f]/10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/18 via-transparent to-black/8" />

        {/* Hero content container with title, subtitle, and description. The content is centered vertically and horizontally within the section, with responsive padding for different screen sizes. The text is styled with appropriate font sizes, weights, and colors to ensure readability against the background image and gradient overlay. */}
        <ContentContainer className="relative h-full">
          <div className="flex items-center py-14 sm:py-16  md:py-20 lg:py-24">
            <div className="max-w-[20rem] sm:max-w-md md:max-w-152 lg:max-w-176">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/75 sm:text-sm">
                Flight deals
              </p>
              <h1 className="mt-2 md:mt-4 font-heading text-xl  sm:text-2xl md:text-4xl lg:text-[44px] font-extrabold leading-[1.2] tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.42)]">
                Make Your Travel
                <br />
                Wishlist, We&apos;ll Do
                <br />
                The Rest
              </h1>
              <p className="mt-2 md:mt-4 max-w-md text-sm font-semibold text-white/90  md:text-base">
                Special Offers To Suit Your Plan
              </p>
            </div>
          </div>
        </ContentContainer>
      </div>
    </section>
  )
}

export default FlightHeroSection
