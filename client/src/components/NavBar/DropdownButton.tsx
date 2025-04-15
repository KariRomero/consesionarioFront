'use client'
import React from 'react';

type DropdownButtonProps = {
  label: string;
  type?: "brands" | "tipos" | null; // opcional para botones como "NOSOTROS"
  openDropdown?: "brands" | "tipos" | null;
  hover?: boolean;
  setOpenDropdown?: (type: "brands" | "tipos" | null) => void;
  setHover?: (hover: boolean) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
};

const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  type,
  openDropdown,
  hover,
  setOpenDropdown,
  setHover,
  onMouseEnter,
  onMouseLeave,
  className = '',
}) => {
  const isActive = type && openDropdown === type && hover;

  const handleMouseEnter = () => {
    if (onMouseEnter) return onMouseEnter();
    if (type && setOpenDropdown && setHover) {
      setOpenDropdown(type);
      setHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) return onMouseLeave();
    if (setOpenDropdown) setOpenDropdown(null);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`font-medium text-base ${isActive ? 'text-primary' : 'text-black'} hover:text-primary ${className}`}
    >
      {label}
    </button>
  );
};

export default DropdownButton;
