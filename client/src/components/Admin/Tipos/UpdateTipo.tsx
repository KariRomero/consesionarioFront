'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { fetchTiposById, updateTipo } from "@/redux/slices/tiposSlice"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const UpdateTipo = () => {
    // const dispatch: AppDispatch = useDispatch();
    // const { id } = useParams<{ id: string }>();
    // const { tipo } = useSelector((state: RootState) => state.tipos)

    const [form, setForm] = useState({
        nombre: '',
        ImageTipo: ''
    });
    // const [file, setFile] = useState<File | null>(null);

    // useEffect(() => {
    //     const numericId = Number(id);
    //     if (!isNaN(numericId)) {
    //         dispatch(fetchTiposById(numericId));
    //     }
    // }, [dispatch, id]);

    // useEffect(() => {
    //     if (tipo) {
    //         setForm({
    //             nombre: tipo.nombre,
    //             ImageTipo: tipo.ImageTipo || ''
    //         })
    //     }
    // }, [tipo]); 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    
    //     const numericId = Number(id);
    //     if (!isNaN(numericId)) {
    //         const formData = new FormData();
    //         formData.append('nombre', form.nombre);
            
           
    //         if (file) {
    //             formData.append('ImageTipo', file);
    //         } else {
      
    //             formData.append('ImageTipo', tipo.ImageTipo); 
    //         }
    
    //         try {
            
    //             await dispatch(updateTipo({ id: numericId, formData })).unwrap();
                
    //         } catch (error) {
    //             console.error("Error updating tipo:", error);
              
    //         }
    //     }
    };
    
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setForm({
    //         ...form,
    //         nombre: e.target.value
    //     });
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const selectedFile = e.target.files[0];
    //         setFile(selectedFile);
    //         const fileURL = URL.createObjectURL(selectedFile);
    //         setForm({
    //             ...form,
    //             ImageTipo: fileURL,
    //         });
    //     }
    };

    const handleRemoveImage = () => {
    //     setForm({
    //         ...form,
    //         ImageTipo: '',
    //     });
    //     setFile(null);
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
                    <button type="submit" className="font-semibold text-medium rounded-md p-2 shadow-md hover:shadow-lg">Actualizar</button>
                </div>
            </form>
        </section>
    )
}

export default UpdateTipo;