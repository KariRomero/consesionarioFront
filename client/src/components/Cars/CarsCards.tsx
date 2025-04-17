import React from 'react'
import CarsCard from './CarsCard'
import { Vehiculo } from '@/types/types'

type CarsCardsProps = {
    cars:Vehiculo[]
}

export default function CarsCards({ cars }: CarsCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 px-6">
    {/* <div className="flex flex-wrap gap-10 justify-start"> */}
      {cars.map((c, index) => (
        <CarsCard car={c} key={index} />
      ))}
    </div>
  );
}

