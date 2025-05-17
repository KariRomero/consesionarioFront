'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  brand: string
  modelo: string
}

export default function TituloResponsive({ brand, modelo }: Props) {
  const visibleRef = useRef<HTMLHeadingElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)
  const [usarAbreviado, setUsarAbreviado] = useState(false)

  const abreviado = brand
    .split(/[\s\-]+/)
    .map(p => p.charAt(0))
    .join('')
    .toUpperCase()

  const textoCompleto = `${brand} ${modelo}`
  const textoReducido = `${abreviado} ${modelo}`

  const medir = () => {
    const span = measureRef.current
    if (!span || window.innerWidth >= 768) {
      setUsarAbreviado(false)
      return
    }

    const lineHeight = parseFloat(getComputedStyle(span).lineHeight)
    const totalHeight = span.clientHeight
    const lines = totalHeight / lineHeight

    setUsarAbreviado(lines > 1)
  }

  useEffect(() => {
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [brand, modelo])

  return (
    <>
      <h2
        ref={visibleRef}
        className="text-3xl 2xl:text-5xl xl:text-4xl 2xl:mb-[3rem] text-primary font-bold mb-4 leading-tight px-4 text-center transition-all duration-200"
      >
        {usarAbreviado ? textoReducido : textoCompleto}
      </h2>

      {/* Elemento invisible para medición precisa sin afectar el layout */}
      <span
        ref={measureRef}
        className="invisible fixed top-0 left-0 z-[-9999] w-[90vw] px-4 text-3xl font-bold leading-tight"
      >
        {textoCompleto}
      </span>
    </>
  )
}