'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

type ButtonsCompartirProps = {
  shareText: string;
  shareUrl: string;
};

export default function ButtonsCompartir({
  shareText,
  shareUrl,
}: ButtonsCompartirProps) {
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback manual para navegadores que no soportan navigator.clipboard
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      toast.success("Enlace copiado al portapapeles");
    } catch (error) {
      toast.error("No se pudo copiar el enlace");
      console.error("Error al copiar:", error);
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex">
      <button
        onClick={handleWhatsAppShare}
        className="text-green-500 px-3 py-2 text-sm sm:text-base flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
      </button>

      <button
        onClick={handleCopy}
        className="text-gray-600 px-3 py-2 text-sm sm:text-base flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faCopy} size="lg" />
      </button>
    </div>
  );
}