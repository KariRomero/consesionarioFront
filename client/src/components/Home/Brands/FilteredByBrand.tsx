import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehiculosByBrandId } from "@/redux/slices/vehiclesByBrandIdReducer";
import CarsCard from "@/components/Cars/CarsCard";
import { log } from 'console';

interface FilteredByBrandProps {
    brandId: number;
}

interface VehicleData {
    imagenes: { url: string }[]; 
    marca: string;
    modelo: string;
    year: number;
    descripcion: string;
    kilometraje: number;  
    combustible: string;
    transmision: string;
    precio: number;
    id: number;
}

const FilteredByBrand: React.FC<FilteredByBrandProps> = ({ brandId }) => {
    const dispatch: AppDispatch = useDispatch();
    const { vehiculos } = useSelector((state: RootState) => state.vehiculos);

    useEffect(() => {
        dispatch(fetchVehiculosByBrandId(brandId.toString()));
    }, [brandId, dispatch]);

    console.log(vehiculos);
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-10 px-10 py-10">
            {vehiculos && vehiculos.length > 0 ? (
                vehiculos.map((v: VehicleData) => (
                    <CarsCard
                        key={v.id}
                        imageUrl={v.imagenes.map(img => img.url)}
                        title={`${v.marca} ${v.modelo} - ${v.year}`}
                        subtitle={v.descripcion}
                        kilometraje={v.kilometraje}  
                        fuelType={v.combustible}
                        transmission={v.transmision}
                        price={`$${v.precio}`}
                    />
                ))
            ) : (
                <p>No hay vehículos disponibles para esta marca.</p>
            )}
        </div>
    );
};

export default FilteredByBrand;
