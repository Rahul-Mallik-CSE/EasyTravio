'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { HotelFAQ } from '@/types/HotelSearchPageTypes'

interface HotelDetailFAQProps {
  faqs: HotelFAQ[]
}

const HotelDetailFAQ: React.FC<HotelDetailFAQProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<number | null>(1)

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-extrabold text-primary mb-6">
        The Most Frequented Questions Asked By Travellers
      </h2>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-sm overflow-hidden"
          >
            <button
              onClick={() => toggle(faq.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <span className="text-sm md:text-base font-semibold text-primary">
                {faq.question}
              </span>
              {openId === faq.id ? (
                <ChevronUp className="w-4 h-4 text-secondary shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-secondary shrink-0" />
              )}
            </button>

            {openId === faq.id && (
              <div className="px-4 pb-4">
                <p className="text-sm text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HotelDetailFAQ
