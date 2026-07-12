# EasyTravio — Architecture Document

## Overview

EasyTravio is a full-stack travel booking platform built on **Next.js 16 App Router** with **Redux Toolkit** for state management and **Tailwind CSS** for styling. The application supports searching, filtering, and booking both hotels and flights with deterministic mock data generation.

**Live URL:** [https://easy-travio.vercel.app](https://easy-travio.vercel.app)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  NavBar   │  │  Pages   │  │  Footer  │  │  Redux Store │   │
│  │ (scroll   │  │ (App     │  │          │  │  (8 slices)  │   │
│  │  aware)   │  │  Router) │  │          │  │              │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Component Layer                             │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────┐     │   │
│  │  │   Hotel     │  │   Flight   │  │     Home       │     │   │
│  │  │ Components  │  │ Components │  │  Components    │     │   │
│  │  └────────────┘  └────────────┘  └────────────────┘     │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────┐     │   │
│  │  │   Common   │  │   Layouts  │  │   shadcn/ui    │     │   │
│  │  │ Components │  │            │  │   Primitives   │     │   │
│  │  └────────────┘  └────────────┘  └────────────────┘     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP (fetch)
┌─────────────────────────┴───────────────────────────────────────┐
│                     Server (Next.js API Routes)                  │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                     │
│  │  /api/hotels      │  │  /api/flights     │                    │
│  │  ├─ GET (search)  │  │  ├─ GET (search)  │                    │
│  │  └─ GET [id]      │  │  └─ GET [id]      │                    │
│  └──────────────────┘  └──────────────────┘                     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Mock Data Layer                             │   │
│  │  ┌────────────────┐  ┌────────────────┐                  │   │
│  │  │ hotelGenerator  │  │ flightGenerator│                  │   │
│  │  │ (200 hotels)    │  │ (500 flights)  │                  │   │
│  │  └────────────────┘  └────────────────┘                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 16.2.7 | App Router, Turbopack, API Routes, SSR/SSG |
| UI Library | React | 19.2.4 | Component rendering, hooks, context |
| State | Redux Toolkit | 2.12.0 | Predictable state container |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Components | shadcn/ui | Latest | Accessible UI primitives |
| Language | TypeScript | 5.x | Type safety |
| PDF | @react-pdf/renderer | 4.5.1 | Ticket/confirmation PDF generation |
| Icons | Lucide + React Icons | Latest | Icon libraries |
| Deployment | Vercel | — | Hosting + edge functions |

---

## Routing Architecture

### App Router Structure

The application uses Next.js App Router with a flat route structure:

```
src/app/
├── layout.tsx                    # Root layout (NavBar + Footer + StoreProvider)
├── page.tsx                      # Home page
├── flight/
│   ├── page.tsx                  # Flight landing
│   ├── search/page.tsx           # Flight search results
│   └── [flightId]/
│       ├── page.tsx              # Flight detail
│       ├── book/page.tsx         # Flight booking (15-min timer)
│       └── confirmation/page.tsx # Flight confirmation + PDF
├── hotel/
│   ├── page.tsx                  # Hotel landing
│   ├── search/page.tsx           # Hotel search results
│   └── [hotelId]/
│       ├── page.tsx              # Hotel detail
│       ├── book/page.tsx         # Hotel booking (15-min timer)
│       └── confirmation/page.tsx # Hotel confirmation + PDF
└── api/
    ├── flights/
    │   ├── route.ts              # GET: search flights
    │   └── [flightId]/route.ts   # GET: flight detail
    └── hotels/
        ├── route.ts              # GET: search hotels
        └── [hotelId]/route.ts    # GET: hotel detail
```

### Server vs Client Components

| Component Type | Examples | Strategy |
|---------------|----------|----------|
| Server Components | `page.tsx` routes, `layout.tsx` | Default — no `'use client'` |
| Client Components | Search bars, filters, cards, forms, booking pages | `'use client'` directive |
| Layouts with hooks | `HotelSearchBarWrapper` | Wrapped in `<Suspense>` for `useSearchParams()` |

---

## State Management

### Redux Store Architecture

The store contains **8 slices** organized by domain:

```
Redux Store
├── Hotel Domain
│   ├── hotelSearch      → search params, results, pagination, loading
│   ├── hotelFilters     → filter state, sort option
│   ├── hotelDetail      → single hotel detail (gallery, reviews, FAQs)
│   └── hotelBooking     → booking session (15-min timer), form, confirmation
├── Flight Domain
│   ├── search           → search params, results, pagination, loading
│   ├── filters          → filter state, sort option
│   ├── flightDetail     → single flight detail
│   └── flightBooking    → booking session (2-min timer), form, confirmation
```

### Data Flow Pattern

Every search feature follows this exact pattern:

```
1. URL Params → SearchBar reads on mount
2. dispatch(updateSearchParams(params))
3. dispatch(searchHotels(params))  → Thunk
4. → fetch(`/api/hotels?${query}`)
5. → hotelGenerator produces deterministic results
6. → Paginated response returned
7. → Stored in Redux state
8. → ResultsSection reads from Redux
9. → Client-side filterHotels() + sortHotels() applied
10. → Rendered to UI
11. → IntersectionObserver detects scroll → dispatch(loadMoreHotels())
12. → Next page fetched → Appended to results array
```

### Booking Session Pattern

Both hotel and flight bookings follow:

```
1. User clicks "Book Now" → Navigate to /{type}/{id}/book
2. BookingPage fetches detail → dispatch(startBookingSession(detail))
3. 15-minute (hotel) / 2-minute (flight) countdown starts
4. Timer shows urgent warning at 60s (hotel) / 30s (flight)
5. On expiry → dispatch(resetBookingSession()) → redirect to search
6. On submit → dispatch(confirmBooking()) → redirect to confirmation
7. Confirmation page reads Redux → renders ticket + generates PDF
```

---

## Component Architecture

### Component Hierarchy

```
src/components/
├── Layouts/
│   ├── NavBar/              # Scroll-aware navbar with center tabs
│   └── Footer/              # Multi-section footer
├── CommonComponents/
│   ├── BookingForm.tsx       # Shared payment form (hotel + flight)
│   ├── ContentContainer.tsx  # Max-width wrapper
│   └── StateDisplay.tsx      # Loading/empty/error states
├── HomeComponents/
│   ├── HomeHeroSection.tsx   # Hero with search bar
│   ├── SpecialOfferSection.tsx # Hotel/Flight split cards
│   ├── TrendingSection.tsx   # Trending destination grid
│   ├── PastOffersSection.tsx # Past offers grid
│   ├── InspirationSection.tsx # Inspiration banner
│   └── SubComponents/        # TrendingCard, PastOfferCard
├── HotelComponents/
│   ├── HotelSearchBar.tsx    # Search with autocomplete
│   ├── HotelLandingPageComponents/
│   │   ├── HotelHeroSection.tsx
│   │   ├── OffersSection.tsx
│   │   ├── ComprasionSection.tsx
│   │   ├── ReviewSection.tsx
│   │   ├── BannerSection.tsx
│   │   └── SubComponents/
│   ├── HotelSearchPageComponents/
│   │   ├── HotelSearchResultsSection.tsx  # Infinite scroll orchestrator
│   │   ├── HotelSortBar.tsx
│   │   └── SubComponents/     # HotelListCard, HotelFilterSide
│   ├── HotelDetailsPageComponents/
│   │   ├── HotelDetailsRanderPage.tsx     # Router: available vs fully booked
│   │   ├── HotelAvailableDetailsPage.tsx
│   │   ├── HotelFullyBookedPage.tsx
│   │   └── SubComponents/     # Gallery, Tabs, FAQ, Reviews, ReviewRates
│   ├── HotelBookingPageComponents/
│   │   ├── HotelBookingPage.tsx           # 15-min timer orchestrator
│   │   └── SubComponents/     # SummaryCard, TripSummary, BookingForm
│   └── HotelConfirmationPageComponents/
│       ├── HotelConfirmationPage.tsx
│       └── SubComponents/     # TicketContent, Banner, Actions, Terms, PDF
├── FlightComponents/          # Mirror structure for flights
│   ├── FlightBookingPageComponents/
│   ├── FlightConfirmationPageComponents/
│   ├── FlightDetailsPageComponents/
│   ├── FlightLandingPageComponents/
│   ├── FlightPageComponents/
│   └── FlightSearchPageComponents/
└── ui/                        # shadcn/ui primitives
```

### Shared Components

The `BookingForm` component is shared between hotel and flight booking:

```tsx
// CommonComponents/BookingForm.tsx
interface BookingFormProps {
  priceSection: React.ReactNode  // Flight or Hotel price display
  onSubmit: (data: BookingFormData) => Promise<void> | void
  submitLabel?: string           // Custom button text
}
```

Each consumer provides its own `priceSection` and `onSubmit` handler:
- **Flight**: Shows per-person pricing, dispatches `setBookingFormData` + `confirmBooking`
- **Hotel**: Shows per-night × nights pricing, dispatches `setHotelBookingFormData` + `confirmHotelBooking`

---

## Data Layer

### Mock Data Generation

Both hotels and flights use **deterministic, hash-based generators** that produce consistent results:

```typescript
// hotelGenerator.ts
const hashString = (value: string): number => {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}
```

**Hotel Generator:** 200 hotels across 10 cities, 25 hotel chains, with deterministic:
- Names, locations, distances, themes, room types
- Star ratings, review counts, pricing
- Amenities (pool, spa, gym, etc.) based on hash probability
- Detail fields: descriptions, gallery images, FAQs, reviews, review rates

**Flight Generator:** 500 flights across 8 airports, 6 airlines, with deterministic:
- Routes, schedules, durations, stops
- Pricing based on route, stops, and cabin class
- Available seats per flight

### Pagination

Both API routes use the same `paginate()` utility:

```typescript
// lib/utils/pagination.ts
export const HOTELS_PAGE_SIZE = 5
export const FLIGHTS_PAGE_SIZE = 4

export const paginate = <T>(items: T[], page: number, limit: number) => {
  const start = (page - 1) * limit
  return {
    items: items.slice(start, start + limit),
    page, limit,
    total: items.length,
    hasMore: start + limit < items.length,
  }
}
```

### Client-Side Filtering

After data is loaded into Redux, filtering and sorting happen entirely on the client:

```typescript
// lib/utils/hotelHelpers.ts
export const filterHotels = (hotels, filters) => hotels.filter(hotel => {
  if (filters.minPrice !== null && hotel.pricePerNight < filters.minPrice) return false
  if (filters.breakfastIncluded && !hotel.breakfastIncluded) return false
  // ... 20+ filter fields
  return true
})

export const sortHotels = (hotels, sortBy) => {
  switch (sortBy) {
    case 'price-asc': return [...hotels].sort((a, b) => a.pricePerNight - b.pricePerNight)
    case 'rating-desc': return [...hotels].sort((a, b) => b.rating - a.rating)
    // ...
  }
}
```

---

## Key Design Decisions

### 1. Infinite Scroll with Redux

Instead of loading all results at once, the system paginates server-side and accumulates client-side:

```
Page 1: [hotel1, hotel2, hotel3, hotel4, hotel5]  → Redux hotels array
Page 2: [hotel6, hotel7, hotel8, hotel9, hotel10] → Redux hotels = [...page1, ...page2]
```

The `IntersectionObserver` watches a sentinel div at the bottom of results and dispatches `loadMore` when visible.

### 2. Session Timer for Bookings

Booking pages enforce time-limited sessions:
- **Hotels**: 15 minutes
- **Flights**: 2 minutes

The timer reads `bookingStartTime` from Redux and calculates remaining time on each tick. On expiry, the session is reset and the user is redirected to search.

### 3. Scroll-Aware Navbar

The navbar uses `window.scrollY` tracking to:
- **Hide** on scroll down (any direction)
- **Show** on scroll up (immediately, no threshold)
- **Blur + shadow** when scrolled past 10px

### 4. PDF Ticket Generation

Both hotel and flight confirmations generate PDFs client-side using `@react-pdf/renderer`:

```typescript
const [{ pdf }, { default: TicketPdfDocument }] = await Promise.all([
  import('@react-pdf/renderer'),
  import('./Pdf/TicketPdfDocument'),
])

const blob = await pdf(<TicketPdfDocument ... />).toBlob()
const url = URL.createObjectURL(blob)
// Download or print
```

### 5. Component-Level Code Splitting

Heavy components (PDF renderer, filter sidebars) are dynamically imported to reduce initial bundle size:

```typescript
const [{ pdf }, { default: TicketPdfDocument }] = await Promise.all([
  import('@react-pdf/renderer'),
  import('./Pdf/TicketPdfDocument'),
])
```

---

## Performance Considerations

| Optimization | Implementation |
|-------------|----------------|
| Image optimization | Next.js `<Image>` with `sizes` prop and Unsplash `?w=` params |
| Code splitting | Dynamic imports for PDF renderer, heavy components |
| Scroll performance | `passive: true` on scroll listeners, `useCallback` for handlers |
| Re-render prevention | `useMemo` for filtered/sorted results, `useRef` for observer guards |
| Bundle size | shadcn/ui tree-shaking, Tailwind purging |
| Static generation | Home page, landing pages prerendered at build time |
| API simulation | 800ms delay to simulate real network conditions |

---

## Environment Variables

No environment variables are required — the application uses deterministic mock data and Unsplash public URLs.

---

## Build & Deployment

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

Deploy to Vercel with zero configuration — all routes are automatically detected.
