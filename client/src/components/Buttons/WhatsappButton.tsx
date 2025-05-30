'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsappButton = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [saludo, setSaludo] = useState('');

  const getSaludo = () => {
    const hora = new Date().toLocaleString('es-AR', {
      hour: 'numeric',
      hour12: false,
      timeZone: 'America/Argentina/Buenos_Aires',
    });
    const h = parseInt(hora);
    if (h >= 6 && h < 13) return 'buen día';
    if (h >= 13 && h < 20) return 'buenas tardes';
    return 'buenas noches';
  };

  useEffect(() => {
    setSaludo(getSaludo());

    const interval = setInterval(() => {
      setRotation((prev) => prev + 360);
      setShowMessage(true);
      setAnimateOut(false);

      setTimeout(() => {
        setAnimateOut(true);
        setTimeout(() => setShowMessage(false), 300); // duración de la animación
      }, 4000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const mensaje = `Hola equipo de RodAR, ${saludo}. Me gustaría hacer una consulta.`;

  return (
    <div className="fixed bottom-[0.8rem] right-[0.8rem] z-50 flex items-center gap-1">
      {showMessage && (
        <div
          className={`bg-white shadow-lg rounded-md px-3 py-2 text-sm text-gray-700 whitespace-nowrap
            ${animateOut ? 'animate-slide-out-left' : 'animate-slide-in-left'}`}
        >
          Comunicate con nosotros
        </div>
      )}

      <a
        href={`https://wa.me/5493435263738?text=${encodeURIComponent(mensaje)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`transition-transform duration-700 flex items-center justify-center text-white rounded-full shadow-xl
          bg-green-600 hover:bg-green-700
          w-10 h-10 sm:w-12 sm:h-12
          transform`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <FontAwesomeIcon
          icon={faWhatsapp}
          className="text-[18px] sm:text-[20px] drop-shadow-md shadow-inner"
        />
      </a>
    </div>
  );
};

export default WhatsappButton;