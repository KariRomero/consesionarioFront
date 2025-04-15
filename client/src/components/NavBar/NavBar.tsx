'use client';
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DropdownWrapper from "./DropdownWrapper";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import { fetchCarsByBrand, fetchCarsByTipo } from "@/redux/slices/carsSlice";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"brands" | "tipos" | null>(null);
  const [showDropdown, setShowDropdown] = useState<"brands" | "tipos" | null>(null);
  const [showNosotrosDropdown, setShowNosotrosDropdown] = useState(false);
  const [hover, setHover] = useState(false);


  const { tipos } = useSelector((state: RootState) => state.tipos);
  const { brands } = useSelector((state: RootState) => state.brands);

  const navRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera o scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    const handleScroll = () => {
      setOpenDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = (type: "brands" | "tipos") => {
    if (openDropdown === type) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(type);
      setShowDropdown(type); // aseguramos que esté montado
    }
    setHover(true);
  };

  useEffect(() => {
    if (openDropdown === null) {
      const timeout = setTimeout(() => {
        setShowDropdown(null); // desmonta después de la animación
      }, 300); // debe coincidir con duration en `DropdownWrapper`
      return () => clearTimeout(timeout);
    } else {
      setShowDropdown(openDropdown);
    }
  }, [openDropdown]);



  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="px-6 py-4 md:px-10 md:py-6 lg:py-8 flex justify-between items-center">

        <Logo />

        {/* Menú escritorio */}
        <DesktopMenu
          openDropdown={openDropdown}
          hover={hover}
          showNosotrosDropdown={showNosotrosDropdown}
          setOpenDropdown={setOpenDropdown}
          setHover={setHover}
          setShowNosotrosDropdown={setShowNosotrosDropdown}
        />
      </div>

      {/* Dropdowns visibles solo en escritorio */}
      {showDropdown && (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => {
            setHover(false);
            setOpenDropdown(null);
          }}
        >
          <DropdownWrapper
            dropdown={showDropdown === "brands" ? brands : tipos}
            type={showDropdown}
            isOpen={openDropdown === showDropdown}
          />
        </div>
      )}
    </nav>
  );
};

export default NavBar;