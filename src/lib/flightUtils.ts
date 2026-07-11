export function durationToMinutes(dur: string): number {
  const match = dur.match(/(\d+)h\s*(\d+)?m?/)
  if (!match) return parseInt(dur, 10) || 0
  return (parseInt(match[1], 10) || 0) * 60 + (parseInt(match[2] || '0', 10) || 0)
}

export function minutesToDuration(totalMins: number): string {
  const h = Math.floor(totalMins / 60)
  const m = totalMins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}
