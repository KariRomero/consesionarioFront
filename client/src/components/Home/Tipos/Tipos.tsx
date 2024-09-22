import FilterTipos from "./FilterTipos"

const Tipos : React.FC = () => {
  return (
    <section className="w-full">
        <h1 className="text-center text-3xl font-semibold pb-8">Tipos de vehículos</h1>
        <FilterTipos/>      
    </section>
  )
}

export default Tipos
