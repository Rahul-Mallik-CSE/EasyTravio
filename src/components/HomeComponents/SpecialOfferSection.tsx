import Image from 'next/image'
import React from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const offers = [
  {
    title: 'Beach Escape',
    image: '/HomePageImages/SpecialOfferImages/Photo 1.png',
    spanClassName: 'md:col-span-5',
    
  },
  {
    title: 'Coastal Views',
    image: '/HomePageImages/SpecialOfferImages/Photo 2.png',
    spanClassName: 'md:col-span-3',
    
  },
  {
    title: 'Road Trip',
    image: '/HomePageImages/SpecialOfferImages/Photo 3.png',
    spanClassName: 'md:col-span-4',
    
  },
  {
    title: 'Lake Adventure',
    image: '/HomePageImages/SpecialOfferImages/Photo 4.png',
    spanClassName: 'md:col-span-6',
    
  },
  {
    title: 'Paris Nights',
    image: '/HomePageImages/SpecialOfferImages/Photo 5.png',
    spanClassName: 'md:col-span-3',
   
  },
  {
    title: 'Desert Safari',
    image: '/HomePageImages/SpecialOfferImages/Photo 6.png',
    spanClassName: 'md:col-span-3',
   
  },
]

const filterTabs = ['All', 'Hotels', 'Flights', 'Multi']

const SpecialOfferSection = () => {
  return (
    <section className="w-full bg-background py-2 sm:py-4 sm:pt-6 md:pt-12 md:py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 ">
        <div className="mb-4 sm:mb-5 md:mb-6">
           {/* Section Title */}
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-extrabold tracking-tight text-primary leading-none">
            Special Offers
          </h2>
            {/* Filter Tabs */}
          <RadioGroup 
            defaultValue={filterTabs[0]} // Sets the first tab as default active
            className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-5 md:gap-x-6"
          >
            {filterTabs.map((tab) => (
              <div 
                key={tab} 
                className="group inline-flex items-center gap-2 text-sm md:text-base font-medium text-primary/90 transition-colors hover:text-theme"
              >
                <RadioGroupItem 
                  value={tab} 
                  id={tab}
                  className="h-5 w-5 border-secondary/70 bg-background text-theme focus-visible:ring-theme data-[state=checked]:border-theme"
                />
                <Label 
                  htmlFor={tab}
                  className="cursor-pointer font-medium text-inherit"
                >
                  {tab}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 gap-1 rounded-sm overflow-hidden md:grid-cols-12 ">
          {offers.map((offer) => (
            <article
              key={offer.title}
              className={`group relative h-50 sm:h-55 md:h-69.5 overflow-hidden   ${offer.spanClassName}`}
            >
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                priority={offer.title === 'Beach Escape' || offer.title === 'Lake Adventure'}
              />

              

              <div className="absolute inset-x-0 bottom-0 flex items-end p-4 md:p-5">
                <button
                  type="button"
                  className="inline-flex items-center cursor-pointer gap-3 md:gap-2 lg:gap-3 rounded-sm bg-black/75 px-4 md:px-2 lg:px-4 py-2 text-sm lg:text-base font-medium text-white backdrop-blur-[2px] transition-colors hover:bg-black/85"
                >
                  <span>Deals Discover</span>
                  <IoArrowForward className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpecialOfferSection
