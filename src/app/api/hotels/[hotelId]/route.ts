import { NextResponse } from 'next/server'
import { findHotelById } from '@/lib/mock/hotelGenerator'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ hotelId: string }> }
) {
  const { hotelId } = await params

  await new Promise((resolve) => setTimeout(resolve, 500))

  const hotel = findHotelById(hotelId)

  if (!hotel) {
    return NextResponse.json({ error: 'Hotel not found' }, { status: 404 })
  }

  return NextResponse.json({ hotel })
}
