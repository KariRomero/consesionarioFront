'use client'
import Banner from './Banner';
import Description from './Description';
import Contact from './Contact';
import Footer from '../Footer/Footer';
import CategoriasSection from './CategoriasSection';
import { fetchTipos } from '@/redux/slices/tiposSlice';
import { RootState } from '@/redux/store';
import { fetchBrands } from '@/redux/slices/brandsSlice';

const Home: React.FC = () => {
 
  return (
    <section className='flex flex-col items-center space-y-28'>
      <Banner/>
      <CategoriasSection
      elementType='tipo'
      title='Tenemos una gran variedad para vos'
      subtitle='Encontrá tu proximo vehículo'
      selector={(state: RootState) => state.tipos.tipos}
      fetchFunction={fetchTipos}
      linkHref='/cars'      
      />
      <Description/>
      <CategoriasSection
      elementType='brand'
      title='Encontrá el auto que mejor se adapte a vos'
      subtitle='Las mejores marcas'
      selector={(state: RootState) => state.brands.brands}
      fetchFunction={fetchBrands}
      linkHref='/cars'
      />
      <Contact/>
      <Footer/>
    </section>
  )
}

export default Home
