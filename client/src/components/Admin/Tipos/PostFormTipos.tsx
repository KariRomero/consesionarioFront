'use client';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { fetchTipos, postTipo } from "@/redux/slices/tiposSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import Swal from 'sweetalert2';

const PostFormTipos: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const [form, setForm] = useState({
        nombre: '',
        ImageTipo: ''
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        dispatch(fetchTipos());
    }, [dispatch]);

    const { tipos } = useSelector((state: RootState) => state.tipos);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            nombre: e.target.value
        });
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            const fileURL = URL.createObjectURL(selectedFile);
            setForm({
                ...form,
                ImageTipo: fileURL,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const exist = tipos.find(t => t.nombre === form.nombre);
        if (exist) {
            Swal.fire({
                title: "Ese Tipo ya existe",
                icon: "error",
                confirmButtonColor: "#1e40af",
            });
        } else {
            const formData = new FormData();
            if (file) {
                formData.append('ImageTipo', file);
            }
            formData.append('nombre', form.nombre);
            dispatch(postTipo(formData)).then(() => {
                Swal.fire({
                    title: "Nuevo Tipo",
                    text: "Has agregado un nuevo Tipo",
                    icon: "success",
                    confirmButtonColor: "#1e40af",
                }).then(() => {
                    // Refresca la lista de tipos después de agregar uno nuevo
                    dispatch(fetchTipos());
                    // Redirigir a la página de tipos
                    router.push('/admin/tipos');
                });
            });
            setForm({
                nombre: '',
                ImageTipo: ''
            });
            setFile(null);
        }
    };

    const handleRemoveImage = () => {
        setForm({
            ...form,
            ImageTipo: '',
        });
    };

    return (
        <section className="w-full h-full bg-white pl-40 pt-10 pr-6">
            <h1 className="text-center text-3xl font-semibold">Todos tus tipos de vehiculo</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <div className="flex flex-col">
                    <label htmlFor="">Tipo</label>
                    <input
                        type="text"
                        className="rounded-md shadow-md"
                        placeholder="Escriba el tipo"
                        value={form.nombre}
                        name="nombre"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Imágen</label>
                    <input
                        type="file"
                        className="rounded-md shadow-md"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mt-10 flex justify-center">
                    {form.ImageTipo && (
                        <div className="relative w-48 h-48 mr-2 mb-2">
                            <Image
                                src={form.ImageTipo}
                                alt="Tipo"
                                width={100}
                                height={100}
                                className="w-full h-full object-cover rounded-md"
                            />
                            <button
                                type="button"
                                className="absolute top-0 right-0 mt-1 mr-1 text-red-500 bg-white rounded-full p-1 shadow"
                                onClick={handleRemoveImage}
                            >
                                <FontAwesomeIcon icon={faTrash} className='px-2' />
                            </button>
                        </div>
                    )}
                </div>
                <div className="w-full flex justify-center">
                    <Link href={'/admin/tipos'}>
                    <button className="font-semibold text-medium rounded-md p-2 shadow-md hover:shadow-lg">Volver</button>
                    </Link>
                    <button type="submit" className="font-semibold text-medium rounded-md p-2 shadow-md hover:shadow-lg">Agregar</button>
                </div>
            </form>
        </section>
    );
}

export default PostFormTipos;