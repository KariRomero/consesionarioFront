import FilterTipos from "./FilterTipos"
import Link from "next/link"

const Tipos: React.FC = () => {
  return (
    <section className="w-full">
      <Link href={'/cars'}>
        <h1 className="text-center text-3xl font-semibold pb-8">Tipos de vehículos</h1>
      </Link>
      <FilterTipos />
    </section>
  )
}

export default Tipos
