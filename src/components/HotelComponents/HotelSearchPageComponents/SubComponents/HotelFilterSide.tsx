'use client'
import React from 'react'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setHotelMinPrice, setHotelMaxPrice, setHotelFilter } from '@/redux/HotelSlice/hotelFiltersSlice'
import type { HotelFilters } from '@/types/HotelSearchPageTypes'

interface HotelFilterSideProps {
  priceRange: { min: number; max: number }
}

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-primary font-bold text-sm md:text-base mb-3">{title}</h3>
)

const FilterCheckbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) => (
  <div className="flex items-center gap-2 mb-2">
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={onChange}
      className="w-4 h-4 border-gray-300 data-[state=checked]:bg-theme data-[state=checked]:border-theme"
    />
    <Label htmlFor={id} className="text-gray-500 text-xs cursor-pointer">
      {label}
    </Label>
  </div>
)

const CollapsibleSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const [open, setOpen] = React.useState(true)
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="pt-4">
        <SectionHeader title={title} />
        <CollapsibleContent>{children}</CollapsibleContent>
        <CollapsibleTrigger asChild>
          <button className="flex cursor-pointer items-center gap-1 text-theme text-xs font-medium mt-1">
            Show More
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  )
}

const HotelFilterSide: React.FC<HotelFilterSideProps> = ({ priceRange }) => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.hotelFilters.filters)

  const handleFilterChange = (key: keyof HotelFilters, value: unknown) => {
    dispatch(setHotelFilter({ key, value }))
  }

  return (
    <div className="w-full">
      <h2 className="text-quaternary font-bold text-lg sm:text-xl md:text-2xl mb-4">
        Filter By
      </h2>

      {/* Budget Slider */}
      <div className="mb-4">
        <p className="text-primary text-xs md:text-sm mb-3">
          Your Budget For Per Night
        </p>
        <Slider
          min={priceRange.min}
          max={priceRange.max}
          step={10}
          value={[filters.minPrice ?? priceRange.min, filters.maxPrice ?? priceRange.max]}
          onValueChange={([min, max]) => {
            dispatch(setHotelMinPrice(min))
            dispatch(setHotelMaxPrice(max))
          }}
          className="mb-3"
        />
        <div className="flex md:gap-1 lg:gap-2">
          <div className="flex items-center border border-secondary rounded-sm px-1 md:px-0.5 lg:px-1 py-1 flex-1">
            <span className="flex-1 text-secondary text-[10px] mr-1">Min Price $</span>
            <input
              type="number"
              value={filters.minPrice ?? priceRange.min}
              onChange={(e) => dispatch(setHotelMinPrice(Number(e.target.value)))}
              className="flex-1 w-full text-[10px] text-secondary outline-none bg-transparent"
            />
          </div>
          <div className="w-full flex items-center border border-secondary rounded-sm px-1 md:px-0.5 lg:px-1 py-1 flex-1">
            <span className="flex-1 text-secondary text-[10px] mr-0">Max Price $</span>
            <input
              type="number"
              value={filters.maxPrice ?? priceRange.max}
              onChange={(e) => dispatch(setHotelMaxPrice(Number(e.target.value)))}
              className="flex-1 w-full text-xs text-secondary outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Popular Filters */}
      <CollapsibleSection title="Popular Filters">
        <FilterCheckbox
          id="breakfastIncluded"
          label="Breakfast Included"
          checked={filters.breakfastIncluded}
          onChange={(v) => handleFilterChange('breakfastIncluded', v)}
        />
        <FilterCheckbox
          id="allInclusive"
          label="All-Inclusive"
          checked={filters.allInclusive}
          onChange={(v) => handleFilterChange('allInclusive', v)}
        />
        <FilterCheckbox
          id="freeCancellation"
          label="Free Cancellation"
          checked={filters.freeCancellation}
          onChange={(v) => handleFilterChange('freeCancellation', v)}
        />
        <FilterCheckbox
          id="pool"
          label="Pool"
          checked={filters.pool}
          onChange={(v) => handleFilterChange('pool', v)}
        />
        <FilterCheckbox
          id="petFriendly"
          label="Pet Friendly"
          checked={filters.petFriendly}
          onChange={(v) => handleFilterChange('petFriendly', v)}
        />
      </CollapsibleSection>

      {/* Room Facilities */}
      <CollapsibleSection title="Room Facilities">
        <FilterCheckbox
          id="ownBathroom"
          label="Own Bathroom"
          checked={filters.ownBathroom}
          onChange={(v) => handleFilterChange('ownBathroom', v)}
        />
        <FilterCheckbox
          id="kitchen"
          label="Kitchen"
          checked={filters.kitchen}
          onChange={(v) => handleFilterChange('kitchen', v)}
        />
        <FilterCheckbox
          id="seaView"
          label="Sea View"
          checked={filters.seaView}
          onChange={(v) => handleFilterChange('seaView', v)}
        />
        <FilterCheckbox
          id="babyBed"
          label="Baby Bed"
          checked={filters.babyBed}
          onChange={(v) => handleFilterChange('babyBed', v)}
        />
        <FilterCheckbox
          id="bathtub"
          label="Bathtub"
          checked={filters.bathtub}
          onChange={(v) => handleFilterChange('bathtub', v)}
        />
      </CollapsibleSection>

      {/* Guest Rating */}
      <div className="pt-4">
        <SectionHeader title="Guest Rating" />
        <RadioGroup
          value={filters.guestRating}
          onValueChange={(v) => handleFilterChange('guestRating', v)}
          className="gap-2"
        >
          {[
            { value: 'all', label: 'All' },
            { value: 'outstanding', label: 'Outstanding 9+' },
            { value: 'veryGood', label: 'Very Good 8+' },
            { value: 'good', label: 'Good 7+' },
            { value: 'excellent', label: 'Excellent' },
            { value: 'poor', label: 'Poor' },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`gr-${opt.value}`}
                className="border-gray-300 text-theme data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label htmlFor={`gr-${opt.value}`} className="text-gray-500 text-xs cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Bed Type */}
      <div className="pt-4">
        <SectionHeader title="Bed Type" />
        <RadioGroup
          value={filters.bedType}
          onValueChange={(v) => handleFilterChange('bedType', v)}
          className="gap-2"
        >
          {[
            { value: 'all', label: 'All' },
            { value: 'twoSingle', label: 'Two Single Beds' },
            { value: 'king', label: 'King Beds' },
            { value: 'babyCots', label: 'Baby Cots' },
            { value: 'double', label: 'Double Bed' },
            { value: 'single', label: 'Single Beds' },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`bt-${opt.value}`}
                className="border-gray-300 data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label htmlFor={`bt-${opt.value}`} className="text-gray-500 text-xs cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Leisure Activities */}
      <CollapsibleSection title="Leisure Activities">
        <FilterCheckbox
          id="sauna"
          label="Sauna"
          checked={filters.sauna}
          onChange={(v) => handleFilterChange('sauna', v)}
        />
        <FilterCheckbox
          id="fitnessCentre"
          label="Fitness Centre"
          checked={filters.fitnessCentre}
          onChange={(v) => handleFilterChange('fitnessCentre', v)}
        />
        <FilterCheckbox
          id="bar"
          label="Bar"
          checked={filters.bar}
          onChange={(v) => handleFilterChange('bar', v)}
        />
        <FilterCheckbox
          id="steamBath"
          label="Steam Bath"
          checked={filters.steamBath}
          onChange={(v) => handleFilterChange('steamBath', v)}
        />
        <FilterCheckbox
          id="yoga"
          label="Yoga"
          checked={filters.yoga}
          onChange={(v) => handleFilterChange('yoga', v)}
        />
      </CollapsibleSection>

      {/* Travel Sustainability */}
      <div className="pt-4">
        <SectionHeader title="Travel Sustainability" />
        <RadioGroup
          value={filters.sustainabilityLevel}
          onValueChange={(v) => handleFilterChange('sustainabilityLevel', v)}
          className="gap-2"
        >
          {[
            { value: 'any', label: 'Any' },
            { value: 'level2', label: 'Level 2 And Above' },
            { value: 'level3', label: 'Level 3 And Above' },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`sl-${opt.value}`}
                className="border-gray-300 data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label htmlFor={`sl-${opt.value}`} className="text-gray-500 text-xs cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Accommodation Classification */}
      <div className="pt-4">
        <SectionHeader title="Accommodation Classification" />
        <RadioGroup
          value={filters.stars}
          onValueChange={(v) => handleFilterChange('stars', v)}
          className="gap-2"
        >
          {[
            { value: 'any', label: 'Any' },
            { value: '5', label: '5 Stars' },
            { value: '4', label: '4 Stars' },
            { value: '3', label: '3 Stars' },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`st-${opt.value}`}
                className="border-gray-300 data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label htmlFor={`st-${opt.value}`} className="text-gray-500 text-xs cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Distance From The Centre */}
      <div className="pt-4">
        <SectionHeader title="Distance From The Centre" />
        <RadioGroup
          value={filters.distance}
          onValueChange={(v) => handleFilterChange('distance', v)}
          className="gap-2"
        >
          {[
            { value: 'any', label: 'Any Distance' },
            { value: '1km', label: 'Less Than 1 Km' },
            { value: '5km', label: 'Less Than 5 Km' },
            { value: '15km', label: 'Less Than 15 Km' },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`dist-${opt.value}`}
                className="border-gray-300 data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label htmlFor={`dist-${opt.value}`} className="text-gray-500 text-xs cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default HotelFilterSide
