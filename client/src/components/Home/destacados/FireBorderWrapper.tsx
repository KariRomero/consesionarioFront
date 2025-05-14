"use client"

import type React from "react"
import type { ReactNode } from "react"

interface FireBorderWrapperProps {
  children: ReactNode
  className?: string
}

const FireBorderWrapper: React.FC<FireBorderWrapperProps> = ({ children, className = "" }) => {
  return (
    <div className={`relative h-[22rem] ${className}`}>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

export default FireBorderWrapper