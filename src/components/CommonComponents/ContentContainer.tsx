import React from 'react'

const ContentContainer = ({ className = '', children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ${className}`}>
      {children}
    </div>
  )
}

export default ContentContainer
