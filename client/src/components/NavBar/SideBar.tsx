// ✅ Sidebar con opción de expandir/minimizar, iniciando expandida y con props para layout
"use client";

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
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r transition-all duration-300 shadow z-50
        ${isExpanded ? "w-64" : "w-16"}`}
    >
      <div className="flex items-center justify-between p-4">
        {isExpanded && <h2 className="text-xl font-bold">RodAR Admin</h2>}
        <button onClick={toggleExpand} className="text-blue">
          <FontAwesomeIcon icon={isExpanded ? faChevronLeft : faChevronRight} />
        </button>
      </div>

      <ul className="mt-6">
        {navItems.map(({ label, href, icon }) => (
          <li key={label} className="group">
            <Link
              href={href}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 text-blue transition"
            >
              <FontAwesomeIcon icon={icon} className="text-lg" />
              {isExpanded && <span className="text-sm font-medium">{label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;