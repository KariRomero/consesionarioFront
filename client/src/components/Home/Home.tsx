'use client'
import Banner from './Banner';
import Filter from './Filter';
import Description from './Description';
import MostSearchedCars from './MostSearchedCars';
import Brands from './Brands/Brands';
import Contact from './Contact';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';

const Home = () => {
 
  return (
    <section className='flex flex-col items-center bg-white pb-4 space-y-28'>
      <Banner/>
      <Filter/>
      <Description/>
      <MostSearchedCars/>
      <Brands/>
      <Contact/>
      <Footer/>
    </section>
  )
}

export default Home
