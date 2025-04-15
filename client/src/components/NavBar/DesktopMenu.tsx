import React from 'react'
import Link from 'next/link';
import DropdownButton from './DropdownButton';
import DropdownWrapper from './DropdownWrapper';

interface DesktopMenuProps {
  openDropdown: "brands" | "tipos" | null;
  hover: boolean;
  showNosotrosDropdown: boolean;
  setOpenDropdown: (value: "brands" | "tipos" | null) => void;
  setHover: (value: boolean) => void;
  setShowNosotrosDropdown: (value: boolean) => void;
}


export default function DesktopMenu({
  openDropdown,
  hover,
  showNosotrosDropdown,
  setOpenDropdown,
  setHover,
  setShowNosotrosDropdown

}: DesktopMenuProps) {
  return (
    <div className="hidden w-full sm:flex sm:justify-between px-20">
      <DropdownButton
        label="MARCAS"
        type="brands"
        openDropdown={openDropdown}
        hover={hover}
        setOpenDropdown={setOpenDropdown}
        setHover={setHover}
      />

      <DropdownButton
        label="TIPOS"
        type="tipos"
        openDropdown={openDropdown}
        hover={hover}
        setOpenDropdown={setOpenDropdown}
        setHover={setHover}
      />

      <NavLink to="/vende">VENDE TU AUTO</NavLink>

      <div className="relative">
        <DropdownButton
          label="NOSOTROS"
          hover={hover}
          onMouseEnter={() => {
            setShowNosotrosDropdown(true);
            setHover(true);
          }}
          onMouseLeave={() => setShowNosotrosDropdown(false)}
          className={showNosotrosDropdown && hover ? 'text-primary' : 'text-black'}
        />

        {showNosotrosDropdown && (
          <div className="absolute mt-9 w-64 z-50">
            <DropdownWrapper
              isOpen={showNosotrosDropdown}
              customContent={
                <div className="flex flex-col">
                  <Link
                    href="/nosotros/faq"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowNosotrosDropdown(false)}
                  >
                    Preguntas Frecuentes
                  </Link>
                  <Link
                    href="/nosotros/quienes-somos"
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    onClick={() => setShowNosotrosDropdown(false)}
                  >
                    Quiénes Somos
                  </Link>
                </div>
              }
            />
          </div>
        )}


      </div>

      <NavLink to="/contact">CONTACTO</NavLink>
    </div>
  )
}

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
};

const NavLink = ({ children, to }: NavLinkProps) => {
  return (
    <Link href={to}>
      <button className="text-left text-base font-medium text-gray-800 hover:text-blue-600 transition-colors">
        {children}
      </button>
    </Link>
  );
};
