import React from 'react'
import Image from 'next/image'
import { BlinkBlur } from 'react-loading-indicators'

export default function Loader() {
  return (
    <div
      className='w-full min-h-screen flex flex-col justify-center items-center space-y-4'
    >
      <Image
        src={"/rodar_letras_ultra_hd.png"}
        alt="Logo"
        width={150}
        height={100}
      />
      <BlinkBlur color={["#4275f5", "#6a9df7", "#3d77e3", "#1e58c1"]} size='small' />
    </div>
  )
}
