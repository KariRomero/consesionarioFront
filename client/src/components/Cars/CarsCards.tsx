import React from 'react'
import CarsCard from './Card/CarsCard'
import { Vehiculo } from '@/types/types'

type CarsCardsProps = {
    cars:Vehiculo[]
}

export default function CarsCards({ cars }: CarsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6">
      {cars.map((c, index) => (
        <CarsCard car={c} key={index} />
      ))}
    </div>
  );
}
