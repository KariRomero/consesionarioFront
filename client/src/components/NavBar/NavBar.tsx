'use client';
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DropdownWrapper from "./DropdownWrapper";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"brands" | "tipos" | null>(null);
  const [showDropdown, setShowDropdown] = useState<"brands" | "tipos" | null>(null);
  const [showNosotrosDropdown, setShowNosotrosDropdown] = useState(false);
  const [hover, setHover] = useState(false);

  const { tipos } = useSelector((state: RootState) => state.tipos);
  const { brands } = useSelector((state: RootState) => state.brands);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setShowNosotrosDropdown(false);
      }
    };

    const handleScroll = () => {
      setOpenDropdown(null);
      setShowNosotrosDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  
  useEffect(() => {
    if (openDropdown === null) {
      const timeout = setTimeout(() => setShowDropdown(null), 300);
      return () => clearTimeout(timeout);
    } else {
      setShowDropdown(openDropdown);
    }
  }, [openDropdown]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full bg-white z-[9999] shadow-sm">
      <div className="flex justify-between items-center px-4 py-4 md:px-10 md:py-6 lg:py-8">
        <Logo />
        <button
          className="sm:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          ☰
        </button>
        <DesktopMenu
          openDropdown={openDropdown}
          hover={hover}
          showNosotrosDropdown={showNosotrosDropdown}
          setOpenDropdown={setOpenDropdown}
          setHover={setHover}
          setShowNosotrosDropdown={setShowNosotrosDropdown}
        />
      </div>

      {/* Dropdown escritorio */}
      {showDropdown && (
        <div
          className="hidden sm:block"
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

      {/* Menú mobile */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        brands={brands}
        tipos={tipos}
      />
    </nav>
  );
};

export default NavBar;
