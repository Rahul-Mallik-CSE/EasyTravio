import React from 'react'

const FlightTravelMapBackdrop = () => {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      <div className="absolute inset-0 bg-[#084967]" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.38) 2.6px, transparent 0)',
          backgroundSize: '14px 14px',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_57%_18%,rgba(255,255,255,0.11),transparent_20%),radial-gradient(circle_at_77%_34%,rgba(255,255,255,0.13),transparent_24%),radial-gradient(circle_at_44%_70%,rgba(255,255,255,0.08),transparent_24%)]" />
      <div className="absolute left-[18%] top-[36%] h-9 w-16 rounded-full border-[3px] border-white/70 border-r-transparent border-b-transparent rotate-[-14deg]" />
      <div className="absolute left-[54%] top-[46%] h-8 w-14 rounded-full border-[3px] border-white/70 border-l-transparent border-b-transparent rotate-[-18deg]" />
      <div className="absolute right-[18%] top-[52%] h-10 w-[4.5rem] rounded-full border-[3px] border-white/70 border-l-transparent border-t-transparent rotate-[12deg]" />
      <div className="absolute left-[73%] top-[32%] h-12 w-12 rounded-full border-[3px] border-white/65 border-r-transparent border-b-transparent rotate-[28deg]" />
    </div>
  )
}

export default FlightTravelMapBackdrop