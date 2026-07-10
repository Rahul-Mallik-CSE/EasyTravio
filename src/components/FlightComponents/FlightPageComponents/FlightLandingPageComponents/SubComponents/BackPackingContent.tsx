import { Button } from '@/components/ui/button'
import { fallIntoTravelImages } from '@/data/FlightLandingPageData'
import FlightGalleryCard from './FlightGalleryCard'

const BackPackingContent = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
          {/* Left side content with price tag, title, description, and book flight button.  */}
          <div className="space-y-6 sm:space-y-7">
            <div className="flex items-start gap-4 sm:gap-5">
                {/* Price tag */}
              <div className="rounded-sm bg-theme px-2 py-0.5 text-white shadow-[0_10px_24px_rgba(7,104,159,0.28)] sm:px-3 sm:py-1.5">
                <p className="text-sm font-semibold sm:text-base">From</p>
                <p className="mt-0.5 text-base font-extrabold sm:text-xl">$700</p>
              </div>

              <h3 className="max-w-xl pt-1 text-[24px] font-extrabold leading-tight text-primary sm:text-[28px] md:text-[32px]">
                Backpacking South Of Asia ...
              </h3>
            </div>

            <div className="space-y-4 text-center text-sm leading-6 text-primary sm:text-base md:text-lg lg:text-left lg:text-xl">
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
              className="h-10  w-full rounded-sm border border-theme bg-white px-8 text-base font-semibold text-theme transition-colors hover:bg-theme hover:text-white  sm:text-lg lg:w-full"
            >
              Book Flight
            </Button>
          </div>

            {/* Right side content with a grid of travel inspiration images.*/}
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
  )
}

export default BackPackingContent
