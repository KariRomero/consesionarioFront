import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCopy } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

type ModalCompartirProps = {
    closeModal: () => void;
    shareText: string;
    shareUrl: string;
}

const ModalCompartir = ({
    closeModal,
    shareText,
    shareUrl
}: ModalCompartirProps) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={closeModal}
        >
            <div
                className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-[90%] max-w-sm relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-black hover:text-gray-300 text-lg sm:text-xl"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-center text-black">Compartir este auto</h3>
                <div className="space-y-2 sm:space-y-3">
                    <button
                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')}
                        className="w-full bg-green-500 text-white px-3 py-2 rounded text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faWhatsapp} />
                        WhatsApp
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(shareUrl);
                            alert('Enlace copiado al portapapeles');
                        }}
                        className="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm sm:text-base flex items-center justify-center gap-2"
                    >
                        <FontAwesomeIcon icon={faCopy} />
                        Copiar enlace
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalCompartir
