'use client';
import React, { useState } from "react";
import Link from "next/link";
import DropdownWrapper from "./DropdownWrapper";

const MobileMenu = ({
  isOpen,
  setIsOpen,
  brands,
  tipos,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  brands: any[];
  tipos: any[];
}) => {
  const [openMobileDropdown, setOpenMobileDropdown] = useState<"brands" | "tipos" | null>(null);

  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Menú</h2>
        <button onClick={() => setIsOpen(false)} className="text-xl">
          &times;
        </button>
      </div>
      <ul className="p-4 space-y-4 text-gray-800">
        <li>
          <button
            onClick={() =>
              setOpenMobileDropdown(openMobileDropdown === "brands" ? null : "brands")
            }
            className="font-semibold text-left w-full"
          >
            MARCAS
          </button>
          {openMobileDropdown === "brands" && (
            <DropdownWrapper dropdown={brands} type="brands" isOpen={true} />
          )}
        </li>
        <li>
          <button
            onClick={() =>
              setOpenMobileDropdown(openMobileDropdown === "tipos" ? null : "tipos")
            }
            className="font-semibold text-left w-full"
          >
            TIPOS
          </button>
          {openMobileDropdown === "tipos" && (
            <DropdownWrapper dropdown={tipos} type="tipos" isOpen={true} />
          )}
        </li>
        <li>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            CONTACTO
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
