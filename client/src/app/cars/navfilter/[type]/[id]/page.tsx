'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { fetchCarsByBrand, fetchCarsByTipo } from '@/redux/slices/carsSlice'
import { fetchBrandById } from '@/redux/slices/brandsSlice'
import { fetchTiposById } from '@/redux/slices/tiposSlice'
import { AppDispatch, RootState } from '@/redux/store'
import CarsPagination from '@/components/Cars/CarsPagination'
import NoDisponible from '@/app/cars/componentes/NoDisponible'
import CarsCards from '@/components/Cars/CarsCards'
import Footer from '@/components/Footer/Footer'

export default function NavFilterPage() {
  const path = usePathname();
  const segments = path.split('/');
  const type = segments[segments.length - 2]; // "brands" o "tipos"
  const id = segments[segments.length - 1];

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (type === 'brands') {
      dispatch(fetchCarsByBrand(id));
      dispatch(fetchBrandById(id));
    } else if (type === 'tipos') {
      dispatch(fetchCarsByTipo(id));
      dispatch(fetchTiposById(id));
    }
  }, [type, id, dispatch]);

  const { cars } = useSelector((state: RootState) => state.cars)
  const { brand } = useSelector((state: RootState) => state.brands)
  const { tipo } = useSelector((state: RootState) => state.tipos)
  console.log('this are cars:', cars);


  return (
    <section className="w-full flex flex-col items-center bg-white">
      {
        type === 'brands' ?
          (
            <h2 className="text-3xl my-8 font-semibold">
              Estas viendo vehiculos {brand?.nombre}
            </h2>
          ) : (
            <h2 className="text-3xl my-8 font-semibold">
              Estas viendo vehiculos {tipo?.nombre}
            </h2>
          )
      }
      {
        cars.length ? (
          <CarsCards cars={cars} />
        ) : (
          <NoDisponible brandOTipo={type === 'brands' ? brand?.nombre : tipo?.nombre}/>
        )
      }
      {/* <CarsPagination/> */}
      <Footer/>
    </section>
  )
}
