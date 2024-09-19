'use client'
import { RootState, AppDispatch } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { fetchBrands } from "@/redux/slices/brandsSlice";

const Footer = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands())
  }, []);

  const brands = useSelector((state: RootState) => state.brands)
  return (
    <section className="w-full border border-x-0 border-y-grey mt-28">
      <div className="grid grid-cols-4 pb-28 pt-16 px-10 gap-10">
        <div>
          <h1 className="font-semibold text-xl">Compañía</h1>
          <ul>
            <li>Acerca de nosotros</li>
            <li>Contacto</li>
          </ul>
        </div>
        {/* <div>
          <h1 className="font-semibold text-xl">Nuestras marcas</h1>
          <ul>
            {
              brands && brands.map((b) => (
                <li>{b}</li>
              ))
            }
          </ul>
        </div> */}
        <div>
          <h1 className="font-semibold text-xl">Tipos de vehículo</h1>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-xl">Horarios de venta</h1>
          <span>Lunes - Viernes 9:00-17:00</span>
          <span>Sábados 9:00-13:00</span>
        </div>
      </div>
    </section>
  )
}

export default Footer
