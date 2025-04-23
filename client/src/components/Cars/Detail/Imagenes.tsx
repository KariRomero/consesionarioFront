import React from 'react'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Vehiculo } from '@/types/types';

type ImagenesProps = {
    toggleZoom: () => void;
    car: Vehiculo | null;
    selectedImage: number;
    handleImageSelect: (index: number) => void
}

export default function Imagenes({
    toggleZoom,
    car,
    selectedImage,
    handleImageSelect
}: ImagenesProps) {
    return (
        <div className="lg:w-1/2 flex flex-col items-center">
            <div
                className="w-full mb-4 relative cursor-zoom-in"
                onClick={toggleZoom}
                style={{ width: '600px', height: '470px' }}
            >
                {car?.imagenes?.[selectedImage]?.url ? (
                    <Image
                        src={car.imagenes[selectedImage].url}
                        alt={car.modelo || 'Imagen del coche'}
                        width={600}
                        height={470}
                        className="rounded-lg object-cover w-full h-full"
                    />
                ) : (
                    <p>No hay imagenes disponibles</p>
                )}
            </div>

            {/* Miniaturas de imágenes */}
            <div className="flex overflow-x-auto space-x-4">
                {car?.imagenes?.map((img, index) => (
                    <button key={index} onClick={() => handleImageSelect(index)}>
                        <img
                            src={img.url}
                            alt={`Image ${index}`}
                            className={`w-20 h-20 object-cover rounded ${selectedImage === index ? 'border-2 ' : ''}`}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
