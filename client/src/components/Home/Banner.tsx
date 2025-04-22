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
      return () => clearInterval(interval);
    }
  }, [currentIndex, slides]);

  if (slides.length === 0) {
    return <div>No hay banners disponibles.</div>;
  }

  const currentSlide = slides[currentIndex];

  // 🎯 Lógica para posición personalizada solo en 2xl
  let backgroundPosition = 'center';
  if (typeof window !== 'undefined' && window.innerWidth >= 1536) {
    if (currentSlide.includes('car1.jpg')) backgroundPosition = 'center 70%';
    if (currentSlide.includes('car3.jpg')) backgroundPosition = 'center 80%';
  }

  return (
    <div className="w-full h-[50vh] md:h-[75vh] lg:h-[100vh] relative group bg-black block">
      <div
        style={{
          backgroundImage: `url(${currentSlide})`,
          backgroundPosition,
        }}
        className="w-full h-full duration-500 bg-no-repeat bg-cover"
      ></div>
    </div>
  );
};

export default Banner;