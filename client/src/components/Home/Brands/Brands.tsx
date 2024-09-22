import FilterBrands from "./FilterBrands";

const Brands: React.FC = () => {
    return (
        <section className="w-full">
            <h1 className="text-center text-3xl font-semibold pb-8">Nuestras marcas</h1>
            <FilterBrands/>            
        </section>
    );
}

export default Brands;
