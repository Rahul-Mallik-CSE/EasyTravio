<div align="center">

# EasyTravio

**A modern hotel and flight booking platform built with Next.js 16, Redux Toolkit, and Tailwind CSS.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?logo=redux)](https://redux-toolkit.js.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)

[**Live Demo →**](https://easy-travio.vercel.app)

</div>

---

## Features

### Hotel Booking
- **Search & Filter** — Search hotels by destination, dates, guests with real-time filtering (price, rating, amenities, star rating, distance)
- **Infinite Scroll** — Results load progressively as you scroll, powered by Redux + IntersectionObserver
- **Hotel Detail Pages** — Photo gallery with carousel, tabbed info (details, prices, rooms, rules), amenities, FAQ accordion, guest reviews carousel, and review rate breakdowns
- **Booking Flow** — 15-minute session timer with urgent warnings, payment form with validation, auto-redirect on expiry
- **PDF Ticket Generation** — Downloadable/printable booking confirmation using `@react-pdf/renderer`

### Flight Booking
- **Search & Filter** — Search flights by origin, destination, date, passengers with client-side filtering (price, stops, airlines, departure window)
- **Infinite Scroll** — Progressive loading with Redux thunks and IntersectionObserver
- **Flight Detail Pages** — Route visualization, amenities, pricing, ratings
- **Booking Flow** — 2-minute session timer, payment form, auto-redirect on expiry
- **Digital Ticket** — Full ticket with QR code, barcode, PDF download/print

### Shared Features
- **Smart Navbar** — Auto-hides on scroll down, reappears on scroll up with blur backdrop
- **Responsive Design** — Mobile-first design across all pages
- **Deterministic Mock Data** — 200+ hotels and 500+ flights generated from hash-based seeds for reproducible results
- **Redux State Management** — Separate slices for search, filters, detail, and booking for both hotels and flights

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI Library | [React 19](https://react.dev) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org) + React Redux |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| PDF Generation | [@react-pdf/renderer](https://react-pdf.org) |
| Icons | [Lucide React](https://lucide.dev) + [React Icons](https://react-icons.github.io/react-icons) |
| Deployment | [Vercel](https://vercel.com) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/your-username/easytravio.git
cd easytravio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── flights/              # Flight search + detail endpoints
│   │   └── hotels/               # Hotel search + detail endpoints
│   ├── flight/                   # Flight pages
│   │   ├── search/               # Search results with infinite scroll
│   │   └── [flightId]/           # Detail → Book → Confirmation
│   ├── hotel/                    # Hotel pages
│   │   ├── search/               # Search results with infinite scroll
│   │   └── [hotelId]/            # Detail → Book → Confirmation
│   ├── layout.tsx                # Root layout (NavBar + Footer)
│   └── page.tsx                  # Home page
├── components/
│   ├── CommonComponents/         # Shared components (BookingForm, StateDisplay, etc.)
│   ├── FlightComponents/         # Flight-specific components
│   │   ├── FlightBookingPageComponents/
│   │   ├── FlightConfirmationPageComponents/
│   │   ├── FlightDetailsPageComponents/
│   │   ├── FlightLandingPageComponents/
│   │   ├── FlightPageComponents/
│   │   └── FlightSearchPageComponents/
│   ├── HotelComponents/          # Hotel-specific components
│   │   ├── HotelBookingPageComponents/
│   │   ├── HotelConfirmationPageComponents/
│   │   ├── HotelDetailsPageComponents/
│   │   ├── HotelLandingPageComponents/
│   │   └── HotelSearchPageComponents/
│   ├── HomeComponents/           # Home page sections
│   ├── Layouts/                  # NavBar + Footer
│   └── ui/                       # shadcn/ui primitives
├── data/                         # Mock data generators
├── lib/                          # Utilities + mock generators
├── redux/                        # Redux store + slices
└── types/                        # TypeScript interfaces
```

---

## Architecture Highlights

### Data Flow

```
URL Params → SearchBar reads on mount → dispatch to Redux
→ Thunk calls API → Mock generator produces data → Paginated response
→ Stored in Redux → Results section reads → Client-side filter + sort
→ IntersectionObserver triggers loadMore → Appends to array
```

### State Slices

| Slice | Purpose |
|-------|---------|
| `hotelSearch` | Search params, hotels array, pagination meta, loading states |
| `hotelFilters` | Filter state + sort option |
| `hotelDetail` | Single hotel detail with gallery, reviews, FAQs |
| `hotelBooking` | Booking session (15-min timer), form data, confirmation |
| `search` | Flight search params, results, pagination |
| `filters` | Flight filter state + sort option |
| `flightDetail` | Single flight detail |
| `flightBooking` | Booking session (2-min timer), form data, confirmation |

### Mock Data Generation

Both hotels and flights use deterministic, hash-based generators that produce consistent results across sessions. Each entity has a structured ID encoding its origin coordinates in the catalog.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero search, explore section, trending destinations, past offers |
| `/hotel` | Hotel landing page with hero, offers, comparison, reviews, banners |
| `/hotel/search` | Hotel search results with filters and infinite scroll |
| `/hotel/[id]` | Hotel detail with gallery, tabs, amenities, FAQ, reviews |
| `/hotel/[id]/book` | Hotel booking with 15-min timer and payment form |
| `/hotel/[id]/confirmation` | Hotel booking confirmation with PDF ticket |
| `/flight` | Flight landing page with hero, offers, travel packages |
| `/flight/search` | Flight search results with filters and infinite scroll |
| `/flight/[id]` | Flight detail with route visualization |
| `/flight/[id]/book` | Flight booking with 2-min timer and payment form |
| `/flight/[id]/confirmation` | Flight confirmation with digital ticket and PDF |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hotels?destination=&page=&limit=` | Search hotels with pagination |
| GET | `/api/hotels/[hotelId]` | Get hotel detail by ID |
| GET | `/api/flights?origin=&destination=&date=&page=&limit=` | Search flights with pagination |
| GET | `/api/flights/[flightId]` | Get flight detail by ID |

---

## License

This project is private and proprietary.
