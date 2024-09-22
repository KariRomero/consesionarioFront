'use client'
import Banner from './Banner';
import Tipos from './Tipos/Tipos';
import Description from './Description';
import MostSearchedCars from './MostSearchedCars';
import Brands from './Brands/Brands';
import Contact from './Contact';
import Footer from '../Footer/Footer';

const Home = () => {
 
  return (
    <section className='flex flex-col items-center bg-white pb-4 space-y-28'>
      <Banner/>
      <Tipos/>
      <Description/>
      {/* <MostSearchedCars/> */}
      <Brands/>
      <Contact/>
      <Footer/>
    </section>
  )
}

export default Home
