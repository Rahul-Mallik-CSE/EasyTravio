'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Mail, AlertCircle, Info, CheckCircle } from 'lucide-react'
import type { Flight } from '@/types/FlightAllTypes'
import { useAppDispatch } from '@/redux/hooks'
import { setBookingFormData, confirmBooking } from '@/redux/FlightSlice/flightBookingSlice'

interface BookingFormProps {
  flight: Flight
}

interface FormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  cardNumber: string
  cvc: string
  expDate: string
  bookingForWork: boolean
  paymentMethod: string
}

const PAYMENT_METHODS = [
  { id: 'visa', label: 'Visa', abbr: 'VISA', color: 'bg-blue-600 text-white' },
  { id: 'mastercard', label: 'Mastercard', abbr: 'MC', color: 'bg-red-500 text-white' },
  { id: 'amex', label: 'Amex', abbr: 'AMEX', color: 'bg-blue-400 text-white' },
]

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

const formatExpDate = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }
  return digits
}

export default function BookingForm({ flight }: BookingFormProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    cardNumber: '',
    cvc: '',
    expDate: '',
    bookingForWork: false,
    paymentMethod: 'visa',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [infoConfirmed, setInfoConfirmed] = useState(false)

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const getFieldError = (field: string) => errors[field] || ''

  const cancellationDate = new Date()
  cancellationDate.setDate(cancellationDate.getDate() + 3)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required'
    if (form.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Card number is required'
    if (form.cvc.length < 3) newErrors.cvc = 'CVC is required'
    if (form.expDate.length < 5) newErrors.expDate = 'Expiry date is required'

    if (!infoConfirmed) {
      newErrors.infoConfirmed = 'Please confirm your information before proceeding'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    dispatch(
      setBookingFormData({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        cardNumber: form.cardNumber,
        cvc: form.cvc,
        expDate: form.expDate,
        paymentMethod: form.paymentMethod,
      })
    )
    dispatch(confirmBooking())
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <PriceDetailsInline flight={flight} />

      {/* Booking for work + payment method */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <button
            type="button"
            onClick={() => updateField('bookingForWork', !form.bookingForWork)}
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors shrink-0 ${form.bookingForWork ? 'border-theme bg-theme' : 'border-border'}`}
          >
            {form.bookingForWork && <div className="w-2 h-2 rounded-full bg-white" />}
          </button>
          <span className="text-sm font-medium text-foreground">Booking For Work</span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary font-medium">Payment Method</span>
          <div className="flex items-center gap-1">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => updateField('paymentMethod', method.id)}
                className={`w-8 h-6 rounded text-xs font-bold cursor-pointer transition-all border-0 ${method.color} ${
                  form.paymentMethod === method.id
                    ? 'ring-2 ring-theme ring-offset-1 scale-110'
                    : 'opacity-50 hover:opacity-75'
                }`}
                title={method.label}
              >
                {method.abbr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="Anna"
            className={`w-full px-3 py-2.5 border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-theme transition-colors ${getFieldError('firstName') ? 'border-red-400 bg-red-50' : 'border-border'}`}
          />
          {getFieldError('firstName') && (
            <p role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{getFieldError('firstName')}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            placeholder="Carinna"
            className={`w-full px-3 py-2.5 border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-theme transition-colors ${getFieldError('lastName') ? 'border-red-400 bg-red-50' : 'border-border'}`}
          />
          {getFieldError('lastName') && (
            <p role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{getFieldError('lastName')}
            </p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-foreground mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          inputMode="numeric"
          value={form.phone}
          onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, ''))}
          placeholder="76437 88888"
          className={`w-full px-3 py-2.5 border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-theme transition-colors ${getFieldError('phone') ? 'border-red-400 bg-red-50' : 'border-border'}`}
        />
        {getFieldError('phone') && (
          <p role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />{getFieldError('phone')}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-foreground mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="anna@example.com"
            className={`w-full pl-9 pr-3 py-2.5 border rounded-sm text-sm bg-background focus:outline-none focus:ring-1 focus:ring-theme transition-colors ${
              getFieldError('email') ? 'border-red-400 bg-red-50' : 'border-border'
            }`}
          />
        </div>
        {getFieldError('email') && (
          <p role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />{getFieldError('email')}
          </p>
        )}
      </div>

      {/* Card Number */}
      <div className="mb-3">
        <label className="block text-xs font-semibold text-foreground mb-1">
          Card Number <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            inputMode="numeric"
            value={form.cardNumber}
            onChange={(e) => updateField('cardNumber', formatCardNumber(e.target.value))}
            placeholder="•••• •••• •••• ••••"
            maxLength={19}
            className={`w-full pl-9 pr-3 py-2.5 border rounded-sm text-sm bg-background font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-theme transition-colors ${getFieldError('cardNumber') ? 'border-red-400 bg-red-50' : 'border-border'}`}
          />
        </div>
        {getFieldError('cardNumber') && (
          <p role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />{getFieldError('cardNumber')}
          </p>
        )}
      </div>

      {/* CVC + EXP */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            CVC <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={form.cvc}
            onChange={(e) => updateField('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="•••"
            maxLength={4}
            className={`w-full px-3 py-2.5 border rounded-sm text-sm bg-background font-mono tracking-widest focus:outline-none focus:ring-1 focus:ring-theme transition-colors ${getFieldError('cvc') ? 'border-red-400 bg-red-50' : 'border-border'}`}
          />
          {getFieldError('cvc') && (
            <p role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{getFieldError('cvc')}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            EXP Date <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={form.expDate}
            onChange={(e) => updateField('expDate', formatExpDate(e.target.value))}
            placeholder="MM/YY"
            maxLength={5}
            className={`w-full px-3 py-2.5 border rounded-sm text-sm bg-background font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-theme transition-colors ${getFieldError('expDate') ? 'border-red-400 bg-red-50' : 'border-border'}`}
          />
          {getFieldError('expDate') && (
            <p role="alert" className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{getFieldError('expDate')}
            </p>
          )}
        </div>
      </div>

      {/* Cancellation policy */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
        <p className="text-sm font-bold text-foreground mb-0.5">Cancellation Policy</p>
        <div className="flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-secondary">
            Get A Full Refund If You Cancel By{' '}
            <span className="font-semibold text-foreground">
              {cancellationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} (PDT)
            </span>.
          </p>
        </div>
      </div>

      {/* Confirm information checkbox */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer group">
          <button
            type="button"
            onClick={() => {
              setInfoConfirmed((prev) => !prev)
              if (errors.infoConfirmed) {
                setErrors((prev) => {
                  const next = { ...prev }
                  delete next.infoConfirmed
                  return next
                })
              }
            }}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
              infoConfirmed
                ? 'border-theme bg-theme'
                : 'border-border group-hover:border-secondary'
            }`}
          >
            {infoConfirmed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
          </button>
          <span className="text-sm text-foreground leading-snug">
            I confirm that all the information provided is correct. I have reviewed my booking details and agree to proceed with the payment.
          </span>
        </label>
        {errors.infoConfirmed && (
          <p role="alert" className="text-xs text-red-500 mt-1.5 flex items-center gap-1 ml-8">
            <AlertCircle className="w-3 h-3" />{errors.infoConfirmed}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !infoConfirmed}
        className="w-full flex items-center justify-center gap-2 bg-theme text-white py-3 rounded-sm font-bold text-sm hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Processing…
          </>
        ) : (
          'Confirm And Pay'
        )}
      </button>
      <p className="text-xs text-secondary text-center mt-2">Check your information before submitting.</p>
    </form>
  )
}

function PriceDetailsInline({ flight }: { flight: Flight }) {
  return (
    <div className="bg-card border border-card-border rounded-lg p-4 mb-6">
      <p className="font-bold text-foreground mb-3">Price Details</p>
      <div className="flex items-center gap-3 text-sm flex-wrap">
        <span className="text-theme font-bold">${flight.price}</span>
        <span className="text-secondary">Per Person</span>
      </div>
      <div className="border-t border-card-border mt-3 pt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Starting From (USD)</span>
        <span className="text-xl font-bold text-theme">${flight.price}</span>
      </div>
    </div>
  )
}
