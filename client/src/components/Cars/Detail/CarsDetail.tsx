"use client";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState, useCallback } from "react";
import { fetchCarById } from "@/redux/slices/carsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faGasPump,
  faGear,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Footer from "../../Footer/Footer";
import Imagenes from "./Imagenes";
import ModalZoom from "@/components/Modal/ModalZoom";
import ModalCompartir from "@/components/Modal/ModalCompartir";
import ButtonsCompartir from "@/components/Buttons/ButtonsCompartir";

const CarsDetail = ({ id }: { id: string }) => {
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();
  const { car } = useSelector((state: RootState) => state.cars);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(`${window.location.origin}/cars/${car?.id}`);
  }, [car?.id]);
  const shareText = `Mirá este auto a la venta en RodAR: ${shareUrl}`;

  const moneda = car?.moneda === "ARS" ? "$" : "USD";

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleNextImage = useCallback(() => {
    const imagenes = car?.imagenes;
    if (!imagenes || imagenes.length === 0) return;

    setSelectedImage((prevIndex) =>
      prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1
    );
  }, [car]);

  const handlePrevImage = useCallback(() => {
    const imagenes = car?.imagenes;
    if (!imagenes || imagenes.length === 0) return;

    setSelectedImage((prevIndex) =>
      prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1
    );
  }, [car]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsZoomed(false);
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      } else if (event.key === "ArrowLeft") {
        handlePrevImage();
      }
    };

    if (isZoomed) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isZoomed, handleNextImage, handlePrevImage]);

  const closeModal = () => setShowModal(false);
  // console.log(car);

  return (
    <section className="w-full xl:mt-[3.5rem] lg:mt-[2.5rem] 2xl:mt-[2rem] mt-[2rem] lg:pb-[3.5rem] bg-white px-4">
      <div className="flex flex-col lg:w-full lg:flex-column  lg:mb-[8rem]">
        {/* Contenedor de la imagen principal */}
        <Imagenes
          toggleZoom={toggleZoom}
          car={car}
          selectedImage={selectedImage}
          handleImageSelect={handleImageSelect}
          shareText={shareText}
          shareUrl={shareUrl}
        />

        {/* Información Detallada del Vehículo */}
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            <button onClick={() => router.push("/cars")}>{/* volver */}</button>
          </div>

          <div className="w-full max-w-[98vw] sm:max-w-[640px] xl:max-w-[800px] 2xl:max-w-[900px] mx-auto">
            {/* Marca/Modelo/Año + Datos técnicos alineados */}
            <div className="w-full flex justify-center">
            <div className="grid grid-cols-2 gap-y-2 gap-x-6 mb-6
  w-full max-w-[99vw] sm:max-w-[600px] xl:max-w-[800px] 2xl:max-w-[900px] px-4 sm:px-0">          {/* Columna izquierda: Marca, Modelo, Año */}
              <div className="flex flex-col gap-2 text-gray-600 text-base lg:text-xl">
                <p className="font-normal flex items-center">
                  <span className="font-bold text-primary mr-1">Marca:</span>{" "}
                  {car?.brand?.nombre || "N/A"}
                </p>
                <p className="font-normal flex items-center">
                  <span className="font-bold text-primary mr-1">Modelo:</span>{" "}
                  {car?.modelo || "N/A"}
                </p>
                <p className="font-normal flex items-center">
                  <span className="font-bold text-primary mr-1">Año:</span>{" "}
                  {car?.year || "N/A"}
                </p>
              </div>

              {/* Columna derecha: KMs, Combustible, Transmisión */}
              <div className="flex flex-col gap-2 text-gray-600 text-base lg:text-xl lg:ml-auto lg:w-fit pl-10 sm:pl-14">
  <div className="flex items-start gap-2">
    <FontAwesomeIcon
      icon={faGaugeHigh}
      className="text-primary text-sm lg:text-base mt-1"
    />
    <p>{`${car?.kilometraje} kms`}</p>
  </div>
  <div className="flex items-start gap-2">
    <FontAwesomeIcon
      icon={faGasPump}
      className="text-primary text-sm lg:text-base mt-1"
    />
    <p>{car?.combustible}</p>
  </div>
  <div className="flex items-start gap-2">
    <FontAwesomeIcon
      icon={faGear}
      className="text-primary text-sm lg:text-base mt-1"
    />
    <p>{car?.transmision}</p>
  </div>
</div>
            </div>

            </div>

            <div className="px-2 lg:px-0">
            {/* 🟦 Descripción abajo, sin cambios de estilo */}
            <div className="bg-[#e6f0f7]   text-gray-800 p-4 rounded-lg shadow-sm mb-4">
              <p className="text-base">{car?.descripcion2}</p>
            </div>
            {showModal && (
              <ModalCompartir
                closeModal={closeModal}
                shareText={shareText}
                shareUrl={shareUrl}
              />
            )}

            {/* 📱 Compartir SOLO en mobile (debajo de descripción) */}
            <div className="w-full max-w-[99vw] sm:max-w-[600px] mx-auto px-0 flex items-center justify-end gap-0 mt-2 lg:hidden">  
            <p className="font-semibold text-gray-500">Compartir</p>
  <ButtonsCompartir shareText={shareText} shareUrl={shareUrl} />
</div>
          </div>
        </div>
          <div className=" 2xl:mt-[2rem] hidden lg:flex items-center justify-end w-full max-w-[99vw] sm:max-w-[640px] xl:max-w-[800px] 2xl:max-w-[900px] mx-auto mt-4">
            <p className="font-semibold text-gray-500 mr-2">Compartir</p>
            <ButtonsCompartir shareText={shareText} shareUrl={shareUrl} />
          </div>
        </div>
      </div>

      {/* Modal de Zoom */}
      {isZoomed && (
        <ModalZoom
          car={car}
          initialImage={selectedImage} // CAMBIO
          toggleZoom={toggleZoom}
        />
      )}

      <Footer />
    </section>
  );
};

export default CarsDetail;
