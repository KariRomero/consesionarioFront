

const PostFormTipos: React.FC = () => {
    return (
        <section className="w-full h-full pl-80 pr-4 bg-white grid md:grid-rows-3 md:grid-flow-col gap-4 ">
            <form className="bg-green flex flex-col justify-center col-span-2">
                <div className="flex flex-col">
                    <label htmlFor="">Tipo</label>
                    <input type="text" className="rounded-md shadow-md"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="">Imágen</label>
                    <input type="text" className="rounded-md shadow-md"/>
                </div>
                <h1>aca se renderiza la miniatura de imagen</h1>
                <button>Agregar</button>
            </form>
        
            <div className="row-span-2"></div>
        </section>
    )
}

export default PostFormTipos
