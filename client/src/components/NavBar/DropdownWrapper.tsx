'use client';
import React, { useEffect, useState } from "react";
import type { Brand, Tipo } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

type DropdownWrapperProps = {
  dropdown?: Brand[] | Tipo[];
  type?: "brands" | "tipos";
  isOpen: boolean;
  customContent?: React.ReactNode;
};

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ dropdown, type, isOpen, customContent }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <div className="relative w-full">
      <div
        className={`bg-white shadow-lg py-6 z-40 transform transition-all duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {customContent ? (
          <div className="px-6">{customContent}</div>
        ) : (
          <>
            {/* Mobile: lista vertical */}
            <div className="sm:hidden px-6">
              <ul className="flex flex-col space-y-2">
                {dropdown?.map((d) => (
                  <li key={d.id}>
                    <button
                      onClick={() => window.open(`/cars/navfilter/${type}/${d.id}`, "_blank")}
                      className="text-left text-base text-gray-800 hover:text-primary w-full"
                    >
                      {d.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop: grid con imágenes */}
            <div className="hidden sm:flex justify-between px-6 sm:px-12 md:px-16">
              {dropdown?.map((d) => (
                <button
                  key={d.id}
                  onClick={() => window.open(`/cars/navfilter/${type}/${d.id}`, "_blank")}
                  className="w-36 h-36 flex flex-col items-center text-center mx-2"
                >
                  <div className="w-full h-44 relative">
                    <Image
                      src={isBrand(d) ? d.ImageBrand || "/default.png" : d.ImageTipo || "/default.png"}
                      alt="logo"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain p-2"
                    />
                  </div>
                  <p className="mt-4 text-base font-semibold text-black">{d.nombre}</p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function isBrand(d: Brand | Tipo): d is Brand {
  return (d as Brand).ImageBrand !== undefined;
}

export default DropdownWrapper;
