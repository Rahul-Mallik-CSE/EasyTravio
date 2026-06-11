import React from 'react'
import type { HotelHeroTab } from '@/types/HotelLandingPageTypes'

interface HotelHeroTabsProps {
  tabs: HotelHeroTab[]
  activeTab: string
  onTabChange: (key: string) => void
}

const HotelHeroTabs = ({ tabs, activeTab, onTabChange }: HotelHeroTabsProps) => {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <div className="flex min-w-max items-end gap-2 sm:gap-3 md:gap-4">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              aria-pressed={isActive}
              className={`min-w-[138px] sm:min-w-[170px] rounded-t-[14px] border border-card-border px-4 py-3 text-center text-sm sm:text-[0.95rem] font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-white text-theme shadow-[0_-1px_0_rgba(255,255,255,0.9),0_10px_24px_rgba(0,0,0,0.12)] -translate-y-1 sm:-translate-y-2 scale-[1.05]'
                  : 'bg-[#edf1f4] text-slate-500 hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default HotelHeroTabs