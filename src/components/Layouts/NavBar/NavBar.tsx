"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { GiHamburgerMenu } from "react-icons/gi"

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const pathname = usePathname()

  const pills = [
    { label: 'Home', href: '/' },
    { label: 'Hotel', href: '/hotel' },
    { label: 'Flight', href: '/flight' },
  ]

  const isActivePill = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href === '/hotel') return pathname?.startsWith('/hotel') ?? false
    if (href === '/flight') return pathname?.startsWith('/flight') ?? false
    return false
  }

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    setScrolled(currentScrollY > 10)

    if (currentScrollY <= 0) {
      setVisible(true)
    } else if (currentScrollY < lastScrollY.current) {
      setVisible(true)
    } else if (currentScrollY > lastScrollY.current) {
      setVisible(false)
    }

    lastScrollY.current = currentScrollY
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])



  return (
    <header
      className={`w-full z-50 transition-all duration-200 ease-in-out ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
          : 'bg-background'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 relative">
              <Image src="/logo.png" alt="EasyTravio" fill sizes="36px" style={{ objectFit: "contain" }} />
            </div>
            <span className="text-theme font-extrabold text-lg tracking-tight hidden sm:block">
              EasyTravio
            </span>
          </Link>

          {/* Center: Navigation Tabs */}
          <nav className="hidden md:flex border border-border items-center gap-3 bg-white rounded-full px-3 py-2">
            {pills.map((pill) => {
              const active = isActivePill(pill.href)
              return (
                <Link
                  key={pill.label}
                  href={pill.href}
                  className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-theme text-white shadow-md shadow-theme/20'
                      : 'text-secondary hover:text-primary hover:bg-white/80'
                  }`}
                >
                  {pill.label}
                </Link>
              )
            })}
          </nav>

          {/* Right: Auth Buttons + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2">
              <button className="px-5 py-1.5 cursor-pointer rounded-full border border-theme text-theme font-semibold text-sm hover:bg-theme hover:text-white transition-all duration-200">
                Sign In
              </button>
              <button className="px-5 py-1.5 cursor-pointer rounded-full bg-theme text-white font-semibold text-sm border border-theme hover:bg-theme/90 transition-all duration-200">
                Register
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                aria-label="menu"
                className="p-2 cursor-pointer rounded-lg border border-border hover:border-theme transition-colors"
              >
                <GiHamburgerMenu className="w-5 h-5 text-theme" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile popup menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" onClick={() => setMobileOpen(false)}>
          <div
            className="w-full bg-background px-4 py-5 shadow-2xl animate-in slide-in-from-top duration-200"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-theme font-extrabold text-lg">EasyTravio</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="close menu"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Nav links */}
              <div className="grid grid-cols-3 gap-2">
                {pills.map((pill) => {
                  const active = isActivePill(pill.href)
                  return (
                    <Link
                      key={pill.label}
                      href={pill.href}
                      className={`rounded-full cursor-pointer border px-4 py-2 text-sm font-semibold text-center transition-all duration-200 ${
                        active
                          ? 'border-theme bg-theme text-white shadow-md'
                          : 'border-border bg-white text-secondary hover:border-theme hover:text-theme'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {pill.label}
                    </Link>
                  )
                })}
              </div>

              {/* Auth buttons */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button className="cursor-pointer rounded-full border border-theme px-4 py-2 font-semibold text-theme text-sm hover:bg-theme/5 transition-colors">
                  Sign In
                </button>
                <button className="cursor-pointer rounded-full border border-theme bg-theme px-4 py-2 font-semibold text-white text-sm hover:bg-theme/90 transition-colors">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default NavBar
