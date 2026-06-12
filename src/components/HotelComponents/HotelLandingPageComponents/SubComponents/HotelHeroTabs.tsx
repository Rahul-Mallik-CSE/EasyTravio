import React from 'react'
import type { HotelHeroTab } from '@/types/HotelLandingPageTypes'
import { Button } from '@/components/ui/button'

interface HotelHeroTabsProps {
  tabs: HotelHeroTab[]
  activeTab: string
  onTabChange: (key: string) => void
}

const HotelHeroTabs = ({ tabs, activeTab, onTabChange }: HotelHeroTabsProps) => {
  return (
    <div className="w-full overflow-visible mx-auto">
      <div
        className="grid w-full grid-cols-1 gap-2  md:grid-cols-5 md:gap-px"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab

          return (
            <Button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              aria-pressed={isActive}
              className={`w-full h-10 lg:h-12 min-w-0
                          rounded-t-sm rounded-b-none cursor-pointer border border-[#d3d3d3]
                          px-4 md:px-2 lg:px-4 py-3 md:py-2 lg:py-3 text-center font-semibold 
                          transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_10px_24px_rgba(0,0,0,0.08)]    ${
                        isActive
                          ? 'bg-white text-theme -translate-y-1.5 text-base shadow-[0_6px_18px_rgba(0,0,0,0.08)] lg:text-xl'
                          : 'bg-[#efefef] text-theme text-sm md:text-xs lg:text-base hover:bg-white'
                      }`}
            >
              {tab.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default HotelHeroTabs