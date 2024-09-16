import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCar, faHandHoldingDollar, faPiggyBank } from "@fortawesome/free-solid-svg-icons"
import { faGem } from "@fortawesome/free-regular-svg-icons"

const Description: React.FC = () => {
    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 px-14 gap-8">
            <h1 className="text-4xl font-bold my-auto">Rendimiento, seguridad y estilo en cada elección.</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-">
                <div className="space-y-6">
                    <div>
                        <FontAwesomeIcon icon={faPiggyBank} className="text-5xl text-center py-4" />
                        <h2 className="font-semibold">Financiamiento</h2>
                        <p className="text-sm">Ofrecemos planes de financiamiento flexibles que se adaptan a tu presupuesto. Trabajamos con varias instituciones para asegurar las mejores tasas y condiciones, facilitando la compra de tu auto nuevo o usado.Nuestro equipo te acompañará en cada paso para que el proceso sea rápido y sencillo.</p>
                    </div>
                    <div >
                        <FontAwesomeIcon icon={faCar} className="text-5xl text-center py-4" />
                        <h2 className="font-semibold">Confiabilidad</h2>
                        <p className="text-sm">Todos nuestros vehículos son rigurosamente inspeccionados para garantizar confiabilidad y seguridad. Trabajamos solo con marcas reconocidas, asegurando que cada auto sea una inversión sólida en la que puedas confiar por muchos años.</p>

                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <FontAwesomeIcon icon={faHandHoldingDollar} className="text-5xl text-center py-4" />
                        <h2 className="font-semibold">Precios competitivos</h2>
                        <p className="text-sm">Nos destacamos por ofrecer precios competitivos y accesibles. Contamos con una amplia variedad de vehículos y promociones especiales para que encuentres el auto que se ajuste a tu presupuesto sin sacrificar calidad. Transparencia y valor son nuestra promesa en cada compra.</p>
                    </div>
                    <div >
                        <FontAwesomeIcon icon={faGem} className="text-5xl text-center py-4" />
                        <h2 className="font-semibold">Servicio</h2>
                        <p className="text-sm">Nuestro equipo está dedicado a ofrecer un servicio al cliente excepcional, desde la compra hasta el mantenimiento. Ofrecemos atención postventa completa, con la seguridad de que siempre estaremos a tu disposición para cualquier necesidad que tengas.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Description
