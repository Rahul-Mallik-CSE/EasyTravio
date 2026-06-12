import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { offersSectionData } from '@/data/HotelLandingPageData'
import Image from 'next/image'


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
                <div
                    key={offer.label}
                    className={`relative w-full h-50 sm:h-55 md:h-69.5 overflow-hidden aspect-4/3 group cursor-pointer ${offer.spanClassName}`}
                >
                    {/* Background Image */}
                    <Image
                        src={offer.image}
                        alt={offer.label}
                        height={400}
                        width={400}
                        
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    
                    {/* Button */}
                    <div className="absolute bottom-4 left-4">
                    <Button
                        className="bg-theme hover:bg-theme/80 text-white 
                                    text-sm md:text-base font-medium px-4 py-2 
                                    rounded-md flex items-center gap-2 shadow-md"
                    >
                        {offer.label}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default OffersSection