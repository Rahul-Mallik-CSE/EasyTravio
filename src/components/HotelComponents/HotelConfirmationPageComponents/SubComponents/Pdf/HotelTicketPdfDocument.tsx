'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { HotelDetail } from '@/types/HotelSearchPageTypes'

interface HotelTicketPdfDocumentProps {
  hotel: HotelDetail
  passengerName: string
  bookingRef: string
  email: string
  totalPrice: number
}

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: 'Helvetica', color: '#1a1a1a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 2, borderBottomColor: '#0891b2' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0891b2' },
  subtitle: { fontSize: 10, color: '#666', marginTop: 4 },
  badge: { backgroundColor: '#0891b2', color: 'white', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: 'white' },
  section: { marginBottom: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#0891b2', marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { color: '#666', fontSize: 9 },
  value: { fontWeight: 'bold', fontSize: 10 },
  gridRow: { flexDirection: 'row', gap: 20, marginBottom: 10 },
  gridCol: { flex: 1 },
  confirmBox: { backgroundColor: '#f0fdf4', borderWidth: 1, borderColor: '#bbf7d0', borderRadius: 4, padding: 12, marginTop: 10 },
  confirmText: { fontSize: 10, color: '#166534', fontWeight: 'bold' },
  footer: { marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#e5e7eb', textAlign: 'center' },
  footerText: { fontSize: 8, color: '#999' },
})

export default function HotelTicketPdfDocument({ hotel, passengerName, bookingRef, email, totalPrice }: HotelTicketPdfDocumentProps) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const checkInDate = new Date()
  checkInDate.setDate(checkInDate.getDate() + 1)
  const checkOutDate = new Date(checkInDate)
  checkOutDate.setDate(checkOutDate.getDate() + hotel.nights)

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>EasyTravio</Text>
            <Text style={styles.subtitle}>Hotel Booking Confirmation</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CONFIRMED</Text>
          </View>
        </View>

        {/* Booking Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Booking Reference</Text>
            <Text style={styles.value}>{bookingRef}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Guest Name</Text>
            <Text style={styles.value}>{passengerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Booking Date</Text>
            <Text style={styles.value}>{today}</Text>
          </View>
        </View>

        {/* Hotel Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hotel Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Hotel Name</Text>
            <Text style={styles.value}>{hotel.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{hotel.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rating</Text>
            <Text style={styles.value}>{hotel.rating} ({hotel.ratingLabel}) · {hotel.starRating} Stars</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Room Type</Text>
            <Text style={styles.value}>{hotel.roomType}</Text>
          </View>
        </View>

        {/* Stay Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stay Details</Text>
          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <Text style={styles.label}>Check-in</Text>
              <Text style={styles.value}>{formatDate(checkInDate)}</Text>
              <Text style={styles.label}>Time: {hotel.checkInTime}</Text>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.label}>Check-out</Text>
              <Text style={styles.value}>{formatDate(checkOutDate)}</Text>
              <Text style={styles.label}>Time: {hotel.checkOutTime}</Text>
            </View>
          </View>
          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <Text style={styles.label}>Guests</Text>
              <Text style={styles.value}>{hotel.adults} Adults, {hotel.children} Children</Text>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{hotel.nights} Night{hotel.nights > 1 ? 's' : ''}</Text>
            </View>
          </View>
        </View>

        {/* Price */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Rate per night</Text>
            <Text style={styles.value}>${hotel.pricePerNight}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Number of nights</Text>
            <Text style={styles.value}>{hotel.nights}</Text>
          </View>
          <View style={[styles.row, { marginTop: 5, paddingTop: 5, borderTopWidth: 1, borderTopColor: '#e5e7eb' }]}>
            <Text style={[styles.value, { fontSize: 12 }]}>Total Amount</Text>
            <Text style={[styles.value, { fontSize: 14, color: '#0891b2' }]}>${totalPrice}</Text>
          </View>
        </View>

        {/* Confirmation */}
        <View style={styles.confirmBox}>
          <Text style={styles.confirmText}>✓ Your booking has been confirmed. A confirmation email has been sent to {email}.</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>This is your official booking confirmation. Please present this at check-in.</Text>
          <Text style={styles.footerText}>EasyTravio · www.easytravio.com</Text>
        </View>
      </Page>
    </Document>
  )
}
