import FilterBrands from "./FilterBrands";
import Link from "next/link";

const Brands: React.FC = () => {
    return (
        <section className="w-full">
            <Link href={'/cars'}>
                <h1 className="text-center text-3xl font-semibold pb-8">Nuestras marcas</h1>
            </Link>
            <FilterBrands />
        </section>
    );
}

export default Brands;
