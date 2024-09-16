'use client'
import { useState, useEffect } from 'react';

const Banner: React.FC = () => {  
  
  const slides: string[] = ['/car1.jpg', '/car2.jpg', '/car3.jpg'];
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = (): void => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(nextSlide, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentIndex, slides]);

  if (slides.length === 0) {
    return <div>No hay banners disponibles.</div>;
  }

  return (
    <div className='max-w h-[720px] w-full relative group bg-black block'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        className='w-full h-full duration-500 bg-center bg-cover'
      ></div>
    </div>
  );
};

export default Banner;