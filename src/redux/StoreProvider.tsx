'use client'

import { useRef } from 'react'
import { makeStore, type AppStore } from '@/redux/store'

let storeRef: AppStore | null = null

export function getStore() {
  if (typeof window === 'undefined') return makeStore()
  if (!storeRef) {
    storeRef = makeStore()
  }
  return storeRef
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = getStore()
  }
  return <>{children}</>
}
