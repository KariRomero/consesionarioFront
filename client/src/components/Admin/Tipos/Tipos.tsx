'use client'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTipos } from "@/redux/slices/tiposSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

const Tipos = ({ isSidebarVisible }: { isSidebarVisible: boolean }) => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTipos());
    }, [dispatch]);

    const { tipos } = useSelector((state: RootState) => state.tipos);

    const handleDelete = () => { };

    return (
        <section className={`bg-white transition-all duration-300 ${isSidebarVisible ? "ml-0" : "ml-48"} pr-6 pt-10`}>
            <div>
                <h1 className="text-center text-3xl font-semibold pb-8">Todos tus tipos de vehiculo</h1>
                <Link href={'/admin/tipos/create'}>
                    <button className="flex justify-end items-center font-semibold text-medium rounded-md p-2 shadow-md hover:shadow-lg">
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Agregar
                    </button>
                </Link>
            </div>
            {tipos.map((t) => (
                <div key={t.id} className="w-full flex justify-between items-center border border-x-0 border-t-0 border-grey">
                    <h1 className="text-lg font-semibold">{t.nombre}</h1>
                    <div className="relative w-48 h-48">
                        <Image
                            src={t.ImageTipo ? t.ImageTipo : "/default.png"}
                            alt={t.nombre}
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="space-x-10">
                        <Link href={`/admin/tipos/edit/${t.id}`}>
                            <button>
                                <FontAwesomeIcon icon={faEye} className="text-xl" />
                            </button>
                        </Link>
                        <button>
                            <FontAwesomeIcon icon={faTrashCan} className="text-xl" />
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Tipos;
