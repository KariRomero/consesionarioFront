import React from 'react';
import Link from 'next/link';
import DropdownButton from './DropdownButton';
import DropdownWrapper from './DropdownWrapper';

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
};

const NavLink = ({ children, to }: NavLinkProps) => {
  return (
    <Link href={to}>
      <button className="font-medium text-base text-black hover:text-primary transition-colors">
        {children}
      </button>
    </Link>
  );
};

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
    <div className="hidden w-full sm:flex sm:justify-end gap-10 px-20">
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

      <NavLink to="/cars">TODOS LOS VEHÍCULOS</NavLink>

      <NavLink to="/contact">CONTACTO</NavLink>
    </div>
  );
}