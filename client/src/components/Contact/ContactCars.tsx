'use client'
import { useState } from "react";

const ContactCars: React.FC = () => {
  
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const handleChange = () => {};
  
    const sendEmail = () => {};  

    return (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 px-10 gap-16 pt-64">

            <div className="text-center py-20">
                <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl  text-start">Consultanos y nos pondremos en contacto</h1>
            </div>



            <form className="text-center" onSubmit={sendEmail}>
                <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="my-4 py-4 w-full text-black"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Tu email"
                    value={formData.email}
                    onChange={handleChange}
                    className="my-4 py-4 w-full text-black"
                    required
                />
                <textarea
                    name="message"
                    placeholder="Tu consulta"
                    value={formData.message}
                    onChange={handleChange}
                    className="my-4 py-4 w-full text-black"
                    required
                />

                <button type="submit" className="p-4 hover:text-green">
                    Enviar mensaje
                </button>

            </form>
        </div>
    )
}

export default ContactCars
