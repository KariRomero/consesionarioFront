"use client"

import type React from "react"
import type { ReactNode } from "react"
import "@/styles/fire-border.css"

interface FireBorderWrapperProps {
  children: ReactNode
  className?: string
}

const FireBorderWrapper: React.FC<FireBorderWrapperProps> = ({ children, className = "" }) => {
  return (
    <div className={`fire-border-container h-[22rem] ${className}`}>
      <div className="fire-border-effect">
        <div className="fire-border">
          {Array.from({ length: 20 }).map((_, index) => {
            const size = Math.random() * 8 + 6
            return (
              <div
                key={index}
                className="fire-particle fire-particle-inner"
                style={{
                  bottom: "0px",
                  left: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `-${Math.random() * 2}s`,
                }}
              />
            )
          })}
        </div>
      </div>
      {/* 👇 Esto arriba en z-index */}
      <div className="fire-border-content relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}

export default FireBorderWrapper