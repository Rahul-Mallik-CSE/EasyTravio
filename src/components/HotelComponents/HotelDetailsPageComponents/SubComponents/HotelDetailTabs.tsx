'use client'
import React, { useState } from 'react'

interface HotelDetailTabsProps {
  description: string
  rules: string[]
  checkInTime: string
  checkOutTime: string
}

const TABS = ['Place Details', 'Info & Prices', 'Rooms & Beds', 'Place Rules'] as const

const HotelDetailTabs: React.FC<HotelDetailTabsProps> = ({
  description,
  rules,
  checkInTime,
  checkOutTime,
}) => {
  const [activeTab, setActiveTab] = useState<string>('Place Details')

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm md:text-base font-bold whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
              activeTab === tab
                ? 'text-theme border-theme'
                : 'text-secondary border-transparent hover:text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === 'Place Details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm md:text-base text-secondary leading-relaxed">
                {description}
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base text-secondary leading-relaxed">
                Explore nearby attractions like the Royal Palace, just 2 km away, and the National Museum,
                situated 1.5 km from this charming hotel. For convenience, the central train station is only
                a short 5-minute walk from the property.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Info & Prices' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-sm p-4">
                <p className="text-xs text-secondary mb-1">Check-in</p>
                <p className="text-sm font-bold text-primary">{checkInTime}</p>
              </div>
              <div className="bg-muted/50 rounded-sm p-4">
                <p className="text-xs text-secondary mb-1">Check-out</p>
                <p className="text-sm font-bold text-primary">{checkOutTime}</p>
              </div>
            </div>
            <p className="text-sm text-secondary">
              Prices may vary depending on dates and availability. All prices include applicable taxes and fees.
              Breakfast is served daily from 7:00 AM to 10:30 AM.
            </p>
          </div>
        )}

        {activeTab === 'Rooms & Beds' && (
          <div className="space-y-3">
            <p className="text-sm text-secondary">
              Our rooms are designed with comfort and style in mind. Each room features premium bedding,
              blackout curtains, and soundproofing for a restful night&apos;s sleep.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Single Room', 'Double Room', 'Twin Room', 'Family Suite', 'Deluxe Suite', 'Penthouse'].map((room) => (
                <div key={room} className="bg-muted/50 rounded-sm p-3 text-center">
                  <p className="text-sm font-semibold text-primary">{room}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Place Rules' && (
          <div className="space-y-3">
            {rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-theme font-bold text-sm mt-0.5">{i + 1}.</span>
                <p className="text-sm text-secondary">{rule}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelDetailTabs
