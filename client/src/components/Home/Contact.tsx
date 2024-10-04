import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";

const Contact: React.FC = () => {
    return (
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 px-16 gap-20">
            <Image
                src='/wsp.jpg'
                width={800}
                height={800}
                alt="Whatsapp"
                className="rounded-2xl"
            />
            <div className="flex flex-col justify-center">
                <h1 className="text-start text-3xl font-semibold">Consultanos tus dudas</h1>
                <span className="text-start text-lg font-medium">P. Sherman</span>
                <span className="text-start text-lg font-medium">Calle Wallaby 42, Sidney</span>
                <span className="font-medium">
                    <FontAwesomeIcon icon={faMobileScreen} />
                    +54 343 5123 789
                </span>
            </div>
        </section>
    )
}

export default Contact
