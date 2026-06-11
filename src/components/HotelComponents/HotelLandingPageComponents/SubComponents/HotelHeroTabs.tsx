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
        className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-px"
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab

          return (
            <Button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              aria-pressed={isActive}
              className={`w-full h-10 md:h-12 min-w-0 rounded-t-sm rounded-b-none cursor-pointer border border-[#d3d3d3] px-4 py-3 text-center font-semibold transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_10px_24px_rgba(0,0,0,0.08)] sm:text-[0.95rem]   ${
                isActive
                  ? 'bg-white text-theme -translate-y-1.5 text-[1.05rem] shadow-[0_6px_18px_rgba(0,0,0,0.08)] lg:text-xl'
                  : 'bg-[#efefef] text-theme text-sm md:text-base hover:bg-white'
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