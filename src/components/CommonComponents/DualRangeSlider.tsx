import { useCallback, useEffect, useRef } from "react"

export default function DualRangeSlider({
  label,
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  formatValue,
}: {
  label: string
  min: number
  max: number
  valueMin: number
  valueMax: number
  onChangeMin: (v: number) => void
  onChangeMax: (v: number) => void
  formatValue: (v: number) => string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef<'min' | 'max' | null>(null)
  const valueMinRef = useRef(valueMin)
  const valueMaxRef = useRef(valueMax)
  useEffect(() => { valueMinRef.current = valueMin }, [valueMin])
  useEffect(() => { valueMaxRef.current = valueMax }, [valueMax])

  const pctMin = ((valueMin - min) / (max - min)) * 100
  const pctMax = ((valueMax - min) / (max - min)) * 100

  const pxToValue = useCallback((clientX: number): number => {
    if (!trackRef.current) return min
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    return Math.round(min + ratio * (max - min))
  }, [min, max])

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    const clickedValue = pxToValue(e.clientX)
    const distToMin = Math.abs(clickedValue - valueMinRef.current)
    const distToMax = Math.abs(clickedValue - valueMaxRef.current)
    if (distToMin <= distToMax) {
      onChangeMin(Math.min(clickedValue, valueMaxRef.current - 1))
    } else {
      onChangeMax(Math.max(clickedValue, valueMinRef.current + 1))
    }
  }, [pxToValue, onChangeMin, onChangeMax])

  useEffect(() => {
    if (!draggingRef.current) return

    const onMove = (ev: MouseEvent) => {
      const next = pxToValue(ev.clientX)
      if (draggingRef.current === 'min') {
        onChangeMin(Math.max(min, Math.min(next, valueMaxRef.current - 1)))
      } else {
        onChangeMax(Math.min(max, Math.max(next, valueMinRef.current + 1)))
      }
    }

    const onUp = () => {
      draggingRef.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [pxToValue, min, max, onChangeMin, onChangeMax])

  useEffect(() => {
    if (!draggingRef.current) return

    const onMove = (ev: TouchEvent) => {
      const next = pxToValue(ev.touches[0].clientX)
      if (draggingRef.current === 'min') {
        onChangeMin(Math.max(min, Math.min(next, valueMaxRef.current - 1)))
      } else {
        onChangeMax(Math.min(max, Math.max(next, valueMinRef.current + 1)))
      }
    }

    const onEnd = () => {
      draggingRef.current = null
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }

    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)

    return () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [pxToValue, min, max, onChangeMin, onChangeMax])

  return (
    <div className="mb-5 max-w-50">
      <p className="text-xs font-semibold text-foreground mb-2">{label}</p>
      <div
        className="relative h-6 flex items-center px-2 ml-2"
        ref={trackRef}
        onClick={handleTrackClick}
      >
        {/* Background track */}
        <div className="absolute inset-x-2 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted" />
        {/* Active range */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-theme pointer-events-none"
          style={{ left: `calc(${pctMin}% + 8px)`, right: `calc(${100 - pctMax}% + 8px)` }}
        />
        {/* Min thumb */}
        <div
          role="slider"
          aria-label="Minimum value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valueMin}
          tabIndex={0}
          className="absolute w-5 h-5 rounded-full bg-theme border-2 border-white shadow-md cursor-grab active:cursor-grabbing select-none"
          style={{ left: `calc(${pctMin}% - 10px)`, top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
          onMouseDown={(e) => { e.stopPropagation(); draggingRef.current = 'min' }}
          onTouchStart={(e) => { e.stopPropagation(); draggingRef.current = 'min' }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') onChangeMin(Math.max(valueMin - 30, min))
            if (e.key === 'ArrowRight') onChangeMin(Math.min(valueMin + 30, valueMax - 1))
          }}
        />
        {/* Max thumb */}
        <div
          role="slider"
          aria-label="Maximum value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valueMax}
          tabIndex={0}
          className="absolute w-5 h-5 rounded-full bg-theme border-2 border-white shadow-md cursor-grab active:cursor-grabbing select-none"
          style={{ left: `calc(${pctMax}% - 10px)`, top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}
          onMouseDown={(e) => { e.stopPropagation(); draggingRef.current = 'max' }}
          onTouchStart={(e) => { e.stopPropagation(); draggingRef.current = 'max' }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') onChangeMax(Math.max(valueMax - 30, valueMin + 1))
            if (e.key === 'ArrowRight') onChangeMax(Math.min(valueMax + 30, max))
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5 px-2">
        <span className="text-xs text-secondary">{formatValue(valueMin)}</span>
        <span className="text-xs text-secondary">{formatValue(valueMax)}</span>
      </div>
    </div>
  )
}