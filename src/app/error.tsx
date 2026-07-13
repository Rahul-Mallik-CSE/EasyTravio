'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-background">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Something went wrong
          </h1>
          <p className="text-sm text-secondary leading-relaxed">
            An unexpected error occurred while processing your request. Please try again or return to the homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-theme text-white rounded-sm font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
        </div>

        {error.digest && (
          <p className="mt-4 text-xs text-tertiary font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
