import { Dispatch, SetStateAction } from 'react';
import { Imagenes } from '@/types/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft,
    faShareNodes,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

type CaruselProps = {
    imageList: Imagenes[];
    currentImageIndex: number;
    title: string;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    handlePrevImage: () => void;
    handleNextImage: () => void;

}

export default function Carusel({
    imageList,
    currentImageIndex,
    title,
    setShowModal,
    handleNextImage,
    handlePrevImage
}: CaruselProps) {
    return (
        <div className="relative w-full h-48 sm:h-48 overflow-hidden p-2">
            <img src={imageList[currentImageIndex]?.url} alt={title} className="w-full h-full object-cover rounded-md" />
            <button
                onClick={() => setShowModal(true)}
                className="absolute top-3 right-3 rounded-full bg-gray-1 text-primary text-xl sm:text-2xl hover:shadow-lg transition z-10"
            >
                <FontAwesomeIcon icon={faPaperPlane} size='2xs' className='px-2'/>
            </button>

            {imageList.length > 1 && (
                <>
                    <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-sm p-1 rounded-full"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-sm p-1 rounded-full"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </>
            )}
        </div>
    )
}
