"use client";
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { FilterState } from "@/types/HotelSearchPageTypes";

interface HotelFilterSideProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-primary font-bold text-sm md:text-base mb-3">{title}</h3>
);

const FilterCheckbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
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
);

const CollapsibleSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(true);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="  pt-4">
        <SectionHeader title={title} />
        <CollapsibleContent>{children}</CollapsibleContent>
        <CollapsibleTrigger asChild>
          <button className="flex cursor-pointer items-center gap-1 text-theme text-xs font-medium mt-1">
            Show More
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
};

const HotelFilterSide: React.FC<HotelFilterSideProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-quaternary font-bold text-lg sm:text-xl md:text-2xl mb-4">
        Filter By
      </h2>

      {/* Budget Slider */}
      <div className="mb-4">
        <p className="text-primary text-xs md:text-sm mb-3">
          Your Budget For Per Night
        </p>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={([min, max]) =>
            onFilterChange({ minPrice: min, maxPrice: max })
          }
          className="mb-3"
        />
        <div className="flex md:gap-1 lg:gap-2">
          <div className="flex items-center border border-secondary rounded-sm px-1 md:px-0.5 lg:px-1 py-1 flex-1">
            <span className="flex-1 text-secondary text-[10px] mr-1">Min Price $</span>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) =>
                onFilterChange({ minPrice: Number(e.target.value) })
              }
              className="flex-1 w-full text-[10px] text-secondary outline-none bg-transparent"
            />
          </div>
          <div className="w-full flex items-center border border-secondary rounded-sm px-1 md:px-0.5 lg:px-1 py-1 flex-1">
            <span className="flex-1 text-secondary text-[10px] mr-0">Max Price $</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) =>
                onFilterChange({ maxPrice: Number(e.target.value) })
              }
              className="flex-1 w-full  text-xs text-secondary outline-none bg-transparent"
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
          onChange={(v) => onFilterChange({ breakfastIncluded: v as boolean })}
        />
        <FilterCheckbox
          id="allInclusive"
          label="All-Inclusive"
          checked={filters.allInclusive}
          onChange={(v) => onFilterChange({ allInclusive: v as boolean })}
        />
        <FilterCheckbox
          id="freeCancellation"
          label="Free Cancellation"
          checked={filters.freeCancellation}
          onChange={(v) => onFilterChange({ freeCancellation: v as boolean })}
        />
        <FilterCheckbox
          id="pool"
          label="Pool"
          checked={filters.pool}
          onChange={(v) => onFilterChange({ pool: v as boolean })}
        />
        <FilterCheckbox
          id="petFriendly"
          label="Pet Friendly"
          checked={filters.petFriendly}
          onChange={(v) => onFilterChange({ petFriendly: v as boolean })}
        />
      </CollapsibleSection>

      {/* Room Facilities */}
      <CollapsibleSection title="Room Facilities">
        <FilterCheckbox
          id="ownBathroom"
          label="Own Bathroom"
          checked={filters.ownBathroom}
          onChange={(v) => onFilterChange({ ownBathroom: v as boolean })}
        />
        <FilterCheckbox
          id="kitchen"
          label="Kitchen"
          checked={filters.kitchen}
          onChange={(v) => onFilterChange({ kitchen: v as boolean })}
        />
        <FilterCheckbox
          id="seeView"
          label="See View"
          checked={filters.seeView}
          onChange={(v) => onFilterChange({ seeView: v as boolean })}
        />
        <FilterCheckbox
          id="babyBed"
          label="Baby Bed"
          checked={filters.babyBed}
          onChange={(v) => onFilterChange({ babyBed: v as boolean })}
        />
        <FilterCheckbox
          id="bathtub"
          label="Bathtub"
          checked={filters.bathtub}
          onChange={(v) => onFilterChange({ bathtub: v as boolean })}
        />
      </CollapsibleSection>

      {/* Guest Rating */}
      <div className="pt-4">
        <SectionHeader title="Gusts Rating" />
        <RadioGroup
          value={filters.guestRating}
          onValueChange={(v) =>
            onFilterChange({ guestRating: v as FilterState["guestRating"] })
          }
          className="gap-2"
        >
          {[
            { value: "all", label: "All" },
            { value: "outstanding", label: "Outstanding 9+" },
            { value: "veryGood", label: "Very Good 8+" },
            { value: "good", label: "Good 7+" },
            { value: "excellent", label: "Excellent" },
            { value: "poor", label: "Poor" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`gr-${opt.value}`}
                className="border-gray-300 text-theme data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label
                htmlFor={`gr-${opt.value}`}
                className="text-gray-500 text-xs cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <button className="flex items-center gap-1 text-theme cursor-pointer text-xs font-medium mt-2">
          Show More <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bed Type */}
      <div className="pt-4">
        <SectionHeader title="Bed Type" />
        <RadioGroup
          value={filters.bedType}
          onValueChange={(v) =>
            onFilterChange({ bedType: v as FilterState["bedType"] })
          }
          className="gap-2"
        >
          {[
            { value: "twoSingle", label: "Two Single Beds" },
            { value: "king", label: "King Beds" },
            { value: "babyCots", label: "Baby Cots" },
            { value: "double", label: "Double Bed" },
            { value: "single", label: "Single Beds" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`bt-${opt.value}`}
                className="border-gray-300 data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label
                htmlFor={`bt-${opt.value}`}
                className="text-gray-500 text-xs cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <button className="flex items-center gap-1 text-theme cursor-pointer text-xs font-medium mt-2">
          Show More <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Leisure Activities */}
      <CollapsibleSection title="Leisure Activities">
        <FilterCheckbox
          id="sauna"
          label="Sauna"
          checked={filters.sauna}
          onChange={(v) => onFilterChange({ sauna: v as boolean })}
        />
        <FilterCheckbox
          id="fitnessCentre"
          label="Fitness Centre"
          checked={filters.fitnessCentre}
          onChange={(v) => onFilterChange({ fitnessCentre: v as boolean })}
        />
        <FilterCheckbox
          id="bar"
          label="Bar"
          checked={filters.bar}
          onChange={(v) => onFilterChange({ bar: v as boolean })}
        />
        <FilterCheckbox
          id="steamBath"
          label="Steam Bath"
          checked={filters.steamBath}
          onChange={(v) => onFilterChange({ steamBath: v as boolean })}
        />
        <FilterCheckbox
          id="yoga"
          label="Yoga"
          checked={filters.yoga}
          onChange={(v) => onFilterChange({ yoga: v as boolean })}
        />
      </CollapsibleSection>

      {/* Travel Sustainability */}
      <div className="pt-4">
        <SectionHeader title="Travel Sustainability" />
        <RadioGroup
          value={filters.sustainabilityLevel}
          onValueChange={(v) =>
            onFilterChange({
              sustainabilityLevel: v as FilterState["sustainabilityLevel"],
            })
          }
          className="gap-2"
        >
          {[
            { value: "level2", label: "Level 2 And Above 1" },
            { value: "level3", label: "Level And Above 2" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`sl-${opt.value}`}
                className="border-gray-300 data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label
                htmlFor={`sl-${opt.value}`}
                className="text-gray-500 text-xs cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <button className="flex items-center gap-1 text-theme cursor-pointer text-xs font-medium mt-2">
          Show More <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Accommodation Classification */}
      <div className="pt-4">
        <SectionHeader title="Accommodation Classification" />
        <RadioGroup
          value={filters.stars}
          onValueChange={(v) =>
            onFilterChange({ stars: v as FilterState["stars"] })
          }
          className="gap-2"
        >
          {[
            { value: "5", label: "5 Stars" },
            { value: "4", label: "4 Stars" },
            { value: "3", label: "3 Stars" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`st-${opt.value}`}
                className="border-gray-300 data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label
                htmlFor={`st-${opt.value}`}
                className="text-gray-500 text-xs cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <button className="flex items-center gap-1 text-theme cursor-pointer text-xs font-medium mt-2">
          Show More <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Distance From The Centre */}
      <div className="pt-4">
        <SectionHeader title="Distance From The Centre" />
        <RadioGroup
          value={filters.distance}
          onValueChange={(v) =>
            onFilterChange({ distance: v as FilterState["distance"] })
          }
          className="gap-2"
        >
          {[
            { value: "1km", label: "Less Than 1 Km" },
            { value: "5km", label: "Less Than 5 Km" },
            { value: "15km", label: "Less Than 15 Km" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt.value}
                id={`dist-${opt.value}`}
                className="border-gray-300 data-[state=checked]:border-theme data-[state=checked]:text-theme"
              />
              <Label
                htmlFor={`dist-${opt.value}`}
                className="text-gray-500 text-xs cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <button className="flex items-center gap-1 text-theme cursor-pointer text-xs font-medium mt-2">
          Show More <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default HotelFilterSide;