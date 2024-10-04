'use client'

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide, faTags, faTruckPickup, faUser, faChevronRight, faChevronCircleLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface SideBarProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isVisible, toggleVisibility }) => {
  const [isSelected, setIsSelected] = useState('');
  const handleClick = (buttonName: string) => {
    setIsSelected(buttonName)
  };
  return (
    <aside className={`fixed top-0 left-0 w-72 h-full bg-white shadow-lg transition-transform transform ${isVisible ? "translate-x-0" : "-translate-x-36"}`}>
      <button
        className="absolute -right-4 pt-10 hover:text-base"
        onClick={toggleVisibility}
      >
        {isVisible ? (
          <FontAwesomeIcon icon={faChevronLeft} className="text-blue" />
        ) : (
          <FontAwesomeIcon icon={faChevronRight} className="text-blue" />
        )}
      </button>
      <ul className="w-full h-full bg-white flex flex-col pt-8">
        {/* Enlaces del sidebar */}
        <Link href="/admin">
          <li >
            <button onClick={() => handleClick('Administrador')} className=" w-full flex justify-between items-center text-blue font-semibold py-6 px-4 hover:shadow-lg">
              Administrador
              <FontAwesomeIcon icon={faUser} className={`text-blue text-4xl shadow-lg rounded-full px-8 py-8 ${isSelected === 'Administrador' ? 'shadow-sm shadow-blue' : ''}`} />
            </button>
          </li>
        </Link>
        <Link href="/admin/tipos">
          <li >
            <button onClick={() => handleClick('Tipos')} className="w-full flex justify-between items-center text-blue font-semibold py-6 px-4 hover:shadow-lg">
              Tipos
              <FontAwesomeIcon icon={faTruckPickup} className={`text-blue text-4xl shadow-lg rounded-full px-8 py-8 ${isSelected === 'Tipos' ? 'shadow-sm shadow-blue' : ''}`} />
            </button>
          </li>
        </Link>
        <Link href="/admin/marcas">
          <li >
            <button onClick={() => handleClick('Marcas')} className="w-full flex justify-between items-center text-blue font-semibold py-6 px-4 hover:shadow-lg">
              Marcas
              <FontAwesomeIcon icon={faTags} className={`text-blue text-4xl shadow-lg rounded-full px-8 py-8 ${isSelected === 'Marcas' ? 'shadow-sm shadow-blue' : ''}`} />
            </button>
          </li>
        </Link>
        <Link href="/admin/vehiculos">
          <li >
            <button onClick={() => handleClick('Vehiculos')} className="w-full flex justify-between items-center text-blue font-semibold py-6 px-4 hover:shadow-lg">
              Vehiculos
              <FontAwesomeIcon icon={faCarSide} className={`text-blue text-4xl shadow-lg rounded-full px-8 py-8 ${isSelected === 'Vehiculos' ? 'shadow-sm shadow-blue' : ''}`} />
            </button>
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default SideBar;
