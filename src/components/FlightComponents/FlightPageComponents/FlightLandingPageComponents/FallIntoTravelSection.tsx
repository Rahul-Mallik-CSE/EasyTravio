import React from 'react'
import ContentContainer from '@/components/CommonComponents/ContentContainer'
import FlightSectionHeader from './SubComponents/FlightSectionHeader'
import FlightGalleryCard from './SubComponents/FlightGalleryCard'
import { Button } from '@/components/ui/button'
import { fallIntoTravelImages } from '@/data/FlightLandingPageData'

const FallIntoTravelSection = () => {
  return (
    <section className="w-full bg-background py-2 sm:py-4 md:py-6">
      <ContentContainer className="space-y-5 sm:space-y-6 md:space-y-8">
        <FlightSectionHeader
          eyebrow="Review Affordable EasySet 24 Trip Packages"
          title="Fall Into Travel"
          subtitle="Going Somewhere To Celebrate This Season? Whether You&apos;re Going Home Or Somewhere To Roam, We&apos;ve Got The Travel Tools To Get You To Your Destination."
          actionLabel="See All"
          eyebrowClassName="text-base tracking-normal uppercase text-theme sm:text-lg md:text-[1.1rem]"
          titleClassName="sm:text-[3rem] md:text-[3.5rem]"
          subtitleClassName="max-w-5xl text-sm leading-6 text-primary sm:text-base md:text-[1.05rem]"
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
          <div className="space-y-6 sm:space-y-7">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="rounded-sm bg-theme px-4 py-2 text-white shadow-[0_10px_24px_rgba(7,104,159,0.28)] sm:px-5 sm:py-3">
                <p className="text-sm font-semibold sm:text-base">From</p>
                <p className="mt-0.5 text-xl font-extrabold sm:text-[1.9rem]">$700</p>
              </div>

              <h3 className="max-w-xl pt-1 text-[1.9rem] font-extrabold leading-tight text-primary sm:text-[2.75rem] md:text-[3.2rem]">
                Backpacking South Of Asia ...
              </h3>
            </div>

            <div className="space-y-4 text-center text-sm leading-6 text-primary sm:text-base md:text-[1.1rem] lg:text-left lg:text-[1.2rem]">
              <p>
                Traveling Is A Unique Experience As It&apos;s The Best Way To Unplug From The Pushes And Pulls Of Daily Life.
              </p>
              <p>
                Relaxing Through An Organized Trip , Helps Us To Forget About Our Problems, Frustrations, And Fears At Home.
              </p>
              <p>
                During Our Journey, We Experience Life In Different Ways. We Explore New Places, Cultures, Cuisines, Traditions, And Ways Of Living.
              </p>
            </div>

            <Button
              type="button"
              className="h-12 w-full rounded-sm border border-theme bg-white px-8 text-base font-semibold text-theme transition-colors hover:bg-theme hover:text-white sm:h-13 sm:text-lg lg:w-full"
            >
              Book Flight
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fallIntoTravelImages.map((image, index) => (
              <FlightGalleryCard
                key={image}
                image={image}
                alt={`Travel inspiration ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </ContentContainer>
    </section>
  )
}

export default FallIntoTravelSection
