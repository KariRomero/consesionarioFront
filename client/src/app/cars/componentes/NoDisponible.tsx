import React from 'react'

type NoDisponibleProps={
    brandOTipo?: string
}

export default function NoDisponible({ brandOTipo } : NoDisponibleProps ) {
  return (
    <div className='w-full h-screen flex justify-center items-start'>
        <h1>Lo sentimos, en este momento no tenemos disponibilidad de vehiculos {brandOTipo}</h1>      
    </div>
  )
}
