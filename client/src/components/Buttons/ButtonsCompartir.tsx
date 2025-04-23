import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from '@fortawesome/free-solid-svg-icons';

type ButtonsCompartirProps = {
  shareText: string;
  shareUrl: string;
}

export default function ButtonsCompartir({
  shareText,
  shareUrl
}: ButtonsCompartirProps) {
  return (
    <div className="flex">
      <button
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')}
        className=" text-green-500  px-3 py-2 text-sm sm:text-base flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faWhatsapp} size='lg'/>

      </button>

      <button
        onClick={() => window.open(`https://www.messenger.com/share?link=${encodeURIComponent(shareUrl)}&app_id=123456789`, '_blank')}
        className=" text-blue-600  px-3 py-2 text-sm sm:text-base flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faFacebookMessenger} size='lg'/>

      </button>

      <button
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          alert('Enlace copiado al portapapeles');
        }}
        className=" text-gray-600 px-3 py-2 text-sm sm:text-base flex items-center justify-center gap-2"
      >
        <FontAwesomeIcon icon={faCopy} size='lg'/>

      </button>
    </div>
  )
}
