import Banner from './Banner';
import Filter from './Filter';
import Description from './Description';

const Home = () => {
  return (
    <section className='flex flex-col items-center bg-white'>
      <Banner/>
      <Filter/>
      <Description/>
    </section>
  )
}

export default Home
