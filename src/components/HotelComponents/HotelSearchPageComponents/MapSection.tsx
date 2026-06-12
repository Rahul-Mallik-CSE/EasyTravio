"use client"
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RiExpandUpDownLine } from 'react-icons/ri'
import Link from 'next/link'

const MapSection = () => {
  const sortOptions = [
    "Our Top Picks For Families",
    "Price: Low to High",
    "Price: High to Low",
    "Top Rated Properties",
    "Distance to Center"
  ]

  const [selectedOption, setSelectedOption] = useState(sortOptions[0])

  return (
    <div className="w-full py-2 sm:py-4 md:py-6 bg-transparent">
      <div className="w-full flex flex-col md:flex-row md:h-49.25 gap-4 md:gap-6 items-stretch">
        
        {/* Left Side: Map Container */}
        <div className="w-full md:w-65 h-45 md:h-full shrink-0 rounded-sm overflow-hidden border border-gray-200">
          <iframe
            title="Gothenburg Map"
            src="https://maps.google.com/maps?q=Gothenburg,Sweden&t=&z=11&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

        {/* Right Side: Content Area */}
        <div className="flex-1 flex flex-col justify-between py-1">
          
          {/* Top Row: Shadcn Dropdown & Header */}
          <div>
            <div className="flex justify-start mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                  <span className="text-sm md:text-base font-bold text-quaternary whitespace-nowrap">Sort By :</span>
                  <span className="text-xs text-quaternary">{selectedOption}</span>
                  <RiExpandUpDownLine className="w-4 h-4 text-quaternary ml-1" />
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="start" className="w-64 bg-white z-50">
                  {sortOptions.map((option, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => setSelectedOption(option)}
                      className={`cursor-pointer px-4 py-2 text-sm focus:bg-gray-100 transition-colors ${
                        selectedOption === option ? 'font-semibold text-theme bg-theme/10' : 'text-quanternary'
                      }`}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Title & Count */}
            <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-800 tracking-tight">
              Gothenburg
            </h2>
            <p className="text-[10px] font-semibold text-gray-700 ">
              120 Properties Found
            </p>
          </div>

          {/* Bottom Row: Description Paragraph */}
          <div className="max-w-130">
            <p className="text-xs  md:text-sm text-quaternary font-medium leading-relaxed mt-4 md:mt-0">
                Travel Professionals Dedicated To Simplifying Your Travel Experience By Curating Flight And 
                Accommodation Services On A User-Friendly Platform. Committed To Quality And 
                Assurance.{' '}
                <Link href="#more" className="text-[10px] text-theme font-bold hover:underline inline-block whitespace-nowrap">
                Find More Here ...
                </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default MapSection