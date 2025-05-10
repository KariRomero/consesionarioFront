'use client'

import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDestacados } from '@/redux/slices/carsSlice'
import { RootState, AppDispatch } from '@/redux/store'
import CarsCard from '@/components/Cars/Card/CarsCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Vehiculo } from '@/types/types'

const DestacadosCarrusel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { destacados, loading } = useSelector((state: RootState) => state.cars)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [cardsToShow, setCardsToShow] = useState(4)
  const [isCarousel, setIsCarousel] = useState(false)

  useEffect(() => {
    dispatch(fetchDestacados())
  }, [dispatch])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const mobile = width < 640
      setIsMobile(mobile)
      if (mobile) setCardsToShow(1)
      else if (width < 1024) setCardsToShow(2)
      else setCardsToShow(4)
      setIsCarousel(!mobile && destacados.length > 4)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [destacados.length])

  useEffect(() => {
    if (!isCarousel || !scrollRef.current) return

    const el = scrollRef.current
    let paused = false

    const scrollStep = () => {
      if (!paused) {
        el.scrollLeft += 1
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
          el.scrollLeft = 0
        }
      }
    }

    const interval = setInterval(scrollStep, 20)
    el.addEventListener('mouseenter', () => (paused = true))
    el.addEventListener('mouseleave', () => (paused = false))

    return () => {
      clearInterval(interval)
      el.removeEventListener('mouseenter', () => (paused = true))
      el.removeEventListener('mouseleave', () => (paused = false))
    }
  }, [isCarousel])
  useEffect(() => {
    console.log("🚗 destacados del store:", destacados.length)
  }, [destacados])

  const loopItems = isCarousel ? [...destacados, ...destacados] : destacados

  useEffect(() => {
    console.log("🧱 cantidad de cards que se renderizan:", loopItems.length)
  }, [loopItems])

  if (loading || destacados.length === 0) return null

  const showHint = isMobile && destacados.length > 1

  return (
    <div className="relative w-full py-10 ">    
    <h1 className="text-center text-3xl font-semibold pb-4 text-primary">
      Tenemos el usado que buscás
    </h1>

      {showHint && (
        <p className="text-center text-sm text-gray-700 -mt-2 mb-4 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
          deslizá para ver más
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
        </p>
      )}

      <div
        ref={scrollRef}
        className={`flex ${isMobile
          ? destacados.length === 1
            ? 'justify-center'
            : 'overflow-x-auto flex-nowrap scrollbar-hide'
          : isCarousel
            ? 'overflow-hidden flex-nowrap h-[400px]'
            : 'flex-wrap justify-center gap-x-5'
          }`}
      >
        {loopItems.map((v: Vehiculo, i: number) => (
          <div
            key={`${v.id}-${i}`}
            className={
              isMobile
                ? destacados.length > 1
                  ? 'min-w-[90%] pr-4'
                  : 'min-w-[90%]'
                : 'min-w-[25%] px-2'
            }
          >
            <div  className='py-2'>
              <CarsCard car={v} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DestacadosCarrusel