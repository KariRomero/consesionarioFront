'use client'
import Banner from './Banner';
import Tipos from './Tipos/Tipos';
import Description from './Description';
// import MostSearchedCars from './MostSearchedCars';
import Brands from './Brands/Brands';
import Contact from './Contact';
import Footer from '../Footer/Footer';
import DestacadosCarrusel from './destacados/DestacadosCarrusel';
const Home: React.FC = () => {
 
  return (
    <section className='flex flex-col items-center space-y-28'>
      <Banner/>
        <DestacadosCarrusel /> 
      <Brands/>
      <Tipos/>
      <Description/>
      {/* <MostSearchedCars/> */}
      <Contact/>
      <Footer/>
    </section>
  )
}

export default Home
