import FilterBrands from "./FilterBrands";

const Brands: React.FC = () => {
    return (
        <div className="w-full">
            <h1 className="text-center text-3xl font-semibold pb-8">Nuestras marcas</h1>
            <FilterBrands/>            
        </div>
    );
}

export default Brands;
