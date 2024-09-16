'use client'
import { RootState, AppDispatch } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchBrands } from "@/redux/slices/brandsSlice";

const Brands: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBrands())
    }, []);

    const { brands } = useSelector((state: RootState) => state.brands)
    return (
        <div className="w-full">
            <h1 className="text-center text-3xl font-semibold pb-8">Nuestras marcas</h1>
            <div className="flex justify-around items-center">
                {
                    brands && brands.map((b) => (
                        <div className="border border-grey rounded-md p-8 font-semibold shadow-md">{b}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Brands
