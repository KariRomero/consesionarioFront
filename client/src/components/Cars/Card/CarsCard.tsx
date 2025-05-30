import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGasPump,
  faGaugeHigh,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { Vehiculo } from "@/types/types";
import ModalCompartir from "../../Modal/ModalCompartir";
import Carusel from "./Carusel";

type CarsCardProps = {
  car: Vehiculo;
};

const CarsCard: React.FC<CarsCardProps> = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const brandName = car?.brand?.nombre ?? "Sin marca";
  const title = `${brandName} ${car?.modelo ?? ""}`;
  const kilometraje = car.kilometraje || 0;
  const fuelType = car.combustible || "Sin especificar";
  const transmission = car.transmision || "Sin especificar";
  const price = car.precio;
  const imageList = car.imagenes ?? [];
  const moneda = car.moneda === "ARS" ? "ARS" : "USD";
  const destacado = car.destacado || false;

  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(`${window.location.origin}/cars/${car.id}`);
  }, [car.id]);

  const closeModal = () => setShowModal(false);
  const formatPrice = (amount: number) => {
    return amount.toLocaleString("es-AR"); // separa con punto
  };
  return (
    <div // solo mantenemos la sombra base
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs mx-auto`}
      style={{ minHeight: "350px" }}
    >
      {/* Modal compartir */}
      {showModal && (
        <ModalCompartir
          closeModal={closeModal}
          shareText={`Mirá este auto a la venta en RodAR: ${shareUrl}`}
          shareUrl={shareUrl}
        />
      )}

      <Carusel
        imageList={imageList}
        title={title}
        setShowModal={setShowModal}
      />

      <div className="p-2 sm:p-2">
        <h2 className="w-full  text-xl sm:text-xl font-bold mb-2 sm:mb-3">
          {title}
        </h2>

        <div className="grid grid-cols-2">
          <div className="flex flex-col items-start mt-[1.5rem] justify-between mb-4 sm:mb-5 text-sm sm:text-sm">
            <div>
              <FontAwesomeIcon
                icon={faGaugeHigh}
                className="mr-2 sm:mr-2 text-primary"
              />
              {`${kilometraje} kms`}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faGasPump}
                className="mr-2 sm:mr-2 text-primary"
              />
              {fuelType}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faGear}
                className="mr-2 sm:mr-2 text-primary"
              />
              {transmission}
            </div>
          </div>
          <div className="flex mt-[2rem] sm:mt-[2.5rem] flex-col">
            {car.vendido ? (
              <div className="inline-block px-2 py-1 text-center text-md text-white sm:text-md font-bold bg-primary rounded">
                Vendido
              </div>
            ) : (
              <p className="text-md sm:text-md mt-2 font-bold">
                {moneda} $ {formatPrice(price)}
              </p>
            )}
            <Link href={`/cars/${car.id}`}>
              <button className="w-full text-center text-primary mr-[2.5rem] text-sm sm:text-sm font-medium hover:underline mt-1">
                Ver detalles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsCard;
