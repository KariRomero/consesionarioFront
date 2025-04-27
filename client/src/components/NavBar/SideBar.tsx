'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faTags,
  faTruckPickup,
  faUser,
  faChevronRight,
  faChevronLeft,
  faHandshake,
  faUsers,
  faMoneyBillWave, // 👈 agregado

} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import LogoutButton from "../Admin/utilities/LogoutButton";

interface SidebarProps {
  isExpanded: boolean;
  toggleExpand: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleExpand }) => {
  const navItems = [
    { label: "Administrador", href: "/admin", icon: faUser },
    { label: "Tipos", href: "/admin/tipos", icon: faTruckPickup },
    { label: "Marcas", href: "/admin/marcas", icon: faTags },
    { label: "Vehículos", href: "/admin/vehiculos", icon: faCarSide },
    { label: "Clientes", href: "/admin/clientes", icon: faUsers },
    { label: "Contratos", href: "/admin/contratos", icon: faHandshake },
    { label: "Finanzas", href: "/admin/finanzas", icon: faMoneyBillWave }, // ✅ Nuevo

  ];

  return (
    <>
      {/* Sidebar lateral para PC */}
      <aside
  className={`fixed top-0 left-0 h-full bg-white border-r shadow z-50 transition-all duration-300
    ${isExpanded ? 'lg:w-64' : 'lg:w-16'} w-0 lg:flex hidden`}
>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between p-4">
          {isExpanded && (
  <Link href="/" className="flex items-center">
    <img
      src="https://res.cloudinary.com/ddkfwu9pm/image/upload/v1745293171/WhatsApp_Image_2025-04-12_at_16.20.00_shwnuf.jpg"
      alt="RodAR Logo"
      className="h-10 max-w-[100px] object-contain"
    />
  </Link>
)}
            <button onClick={toggleExpand} className="text-blue">
              <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faChevronRight} />
            </button>
          </div>

          <ul className="mt-6 px-4">
            {navItems.map(({ label, href, icon }) => (
              <li key={label} className="group">
                <Link
                  href={href}
                  className="flex items-center gap-4  py-3 hover:bg-gray-100 text-blue transition"
                >
                  
                  <FontAwesomeIcon icon={icon} className="text-lg" />
                  {isExpanded && <span className="text-sm font-medium">{label}</span>}
                </Link>
                
              </li>
              
            ))}
            <div className="py-3">
            <LogoutButton/>

            </div>
          </ul>
          
        </div>
      </aside>

      {/* Navbar superior para móvil/tablet */}
   {/* Navbar superior para móvil/tablet */}
   <nav className="lg:hidden fixed top-0 left-0 w-full bg-white border-b shadow z-50 flex justify-around items-center py-[1rem]">
  <Link
    href="/"
    className="flex flex-col items-center transition"
  >
    <img
      src="https://res.cloudinary.com/ddkfwu9pm/image/upload/v1745293171/WhatsApp_Image_2025-04-12_at_16.20.00_shwnuf.jpg"
      alt="RodAR Logo"
      className="w-[6rem] h-[2rem]  object-cover"
    />
  </Link>
  {navItems.map(({ label, href, icon }) => (
    <Link
      key={label}
      href={href}
      className="flex flex-col items-center text-blue hover:text-black transition"
    >
      <FontAwesomeIcon icon={icon} className="text-xl" />
    </Link>
  ))}

  {/* 🔹 Logo adicional que lleva a "/" */}

  {/* Logout como ícono */}
  <LogoutButton />
</nav>
    </>
  );
};

export default Sidebar;