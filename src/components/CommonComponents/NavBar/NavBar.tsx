"use client"
import Image from "next/image"
import React, { useState } from "react"
import { CiSearch } from "react-icons/ci"
import { GiHamburgerMenu } from "react-icons/gi"

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const pills = ["Trip", "%Deals", "Hotel", "Flight", "Apartment", "Camper"]

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: logo + small icons */}
          <div className="flex items-center gap-4">
            <div className=" items-center gap-3">
              <div className="w-10 h-10 relative mx-auto">
                <Image src="/logo.png" alt="EasyTravio" fill sizes="48px" style={{ objectFit: "contain" }} />
              </div>
              <div className="hidden sm:block">
                <div className="text-theme font-bold text-base">EasyTravio</div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button aria-label="help" className="w-5 h-5 font-bold rounded-full flex items-center justify-center border border-theme text-theme">?</button>
              <button aria-label="lang" className="w-5 h-5 rounded-full flex items-center justify-center border border-none overflow-hidden">
                <Image src="/united-kingdom.png" alt="Language" width={16} height={16} 
                className="w-6 h-6 object-cover" />
              </button>
            </div>
          </div>

          {/* Center: search (hidden on very small screens) */}
          <div className="flex-1 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full border border-border rounded-sm py-1 pl-4 pr-10 text-secondary placeholder:font-semibold placeholder:text-secondary shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-200"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary cursor-pointer">
                  <CiSearch className="w-5 h-5 font-semibold" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: auth buttons + mobile toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <button className="py-2 px-8 md:px-12 cursor-pointer rounded-sm border border-theme text-theme font-semibold">Sing In</button>
              <button className="py-2 px-8 md:px-12 cursor-pointer rounded-sm border border-theme text-theme font-semibold">Register</button>
            </div>

            <div className="sm:hidden">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                aria-label="menu"
                className="p-1.5 cursor-pointer rounded-md border border-theme"
              >
                <GiHamburgerMenu className="w-6 h-6 text-theme" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pills row */}
      <nav className="pt-2 pb-6 hidden sm:block">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {pills.map((p) => {
              const active = p === "Hotel"
              return (
                <button
                  key={p}
                  className={`px-4 py-1 cursor-pointer rounded-full border ${active ? "bg-theme text-white border-theme shadow" : "bg-white text-secondary border-border"}`}
                >
                  {p}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative">
                  <Image src="/logo.png" alt="EasyTravio" fill sizes="40px" style={{ objectFit: "contain" }} />
                </div>
                <div className="font-semibold text-blue-600">EasyTravio</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="py-2 px-4 rounded-md border border-blue-400 text-blue-600">Sing In</button>
                <button className="py-2 px-4 rounded-md border border-blue-400 text-blue-600">Register</button>
              </div>
            </div>

            <div>
              <input
                type="search"
                placeholder="Search"
                className="w-full border border-gray-200 rounded-md py-3 pl-4 pr-4 text-gray-600 placeholder-gray-400"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {pills.map((p) => (
                <button key={p} className={`px-4 py-2 rounded-full border ${p === "Hotel" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border-gray-300"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default NavBar
