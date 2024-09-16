import Image from "next/image"

const Filter = () => {  
  return (
    <section className="w-full py-28">
      <h1 className="text-center text-3xl font-semibold">Tipos de vehículos</h1>
      <div className="flex justify-around items-center py-4">
        <button className="text-lg font-semibold">
          <Image
          src='/sedan1.png'
          width={200}
          height={200}
          alt="coupe"
          />
          Sedan
          </button>
        <button className="text-lg font-semibold">
        <Image
          src='/coupe.png'
          width={200}
          height={200}
          alt="coupe"
          />
          Coupe
          </button>
        <button className="text-lg font-semibold">
        <Image
          src='/SUV.png'
          width={200}
          height={200}
          alt="coupe"
          />
          SUV
          </button>
        <button className="text-lg font-semibold">
        <Image
          src='/pickup.png'
          width={200}
          height={200}
          alt="coupe"
          />
          Pickup
          </button>
        <button className="text-lg font-semibold">
        <Image
          src='/hatchback.png'
          width={200}
          height={200}
          alt="coupe"
          />
          Hatchback
          </button>
      </div>
    </section>
  )
}

export default Filter
