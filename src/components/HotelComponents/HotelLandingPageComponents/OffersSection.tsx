import React from 'react'
import { offersSectionData } from '@/data/HotelLandingPageData'
import OfferCard from './SubComponents/OfferCard'


const OffersSection = () => {
  const { sectionTitle, offers } = offersSectionData

  return (
    <section className="w-full py-2 sm:py-4 md:py-6 bg-background">
        <div className="max-w-7xl px-4 sm:px-6 md:px-8  mx-auto ">
            <h2 className="text-2xl md:text-[32px] font-extrabold text-primary mb-4 md:mb-6">
                {sectionTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 rounded-sm overflow-hidden">
                {offers.map((offer) => (
                    <OfferCard key={offer.label} offer={offer} />
                ))}
            </div>
        </div>
    </section>
  )
}

export default OffersSection