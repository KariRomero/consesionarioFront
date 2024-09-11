import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCar, faHandHoldingDollar, faPiggyBank } from "@fortawesome/free-solid-svg-icons"
import { faGem } from "@fortawesome/free-regular-svg-icons"

const Description = () => {
    return (
        <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 my-20 px-14 gap-8">
            <div className="font-bold my-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta reiciendis, provident dicta voluptate tempore voluptatum itaque fugiat? Quia quod, veritatis numquam voluptatibus aliquam totam earum omnis? Est ducimus aperiam similique.</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <FontAwesomeIcon icon={faPiggyBank} className="text-5xl text-center"/>
                        <h2 className="font-semibold">Financiamiento</h2>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta reiciendis, provident dicta voluptate tempore voluptatum itaque fugiat? </p>
                    </div>
                    <div className="space-y-4">
                        <FontAwesomeIcon icon={faHandHoldingDollar} className="text-5xl text-center"/>
                        <h2 className="font-semibold">Financiamiento</h2>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta reiciendis, provident dicta voluptate tempore voluptatum itaque fugiat? </p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <FontAwesomeIcon icon={faCar} className="text-5xl text-center"/>
                        <h2 className="font-semibold">Financiamiento</h2>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta reiciendis, provident dicta voluptate tempore voluptatum itaque fugiat? </p>
                    </div>
                    <div className="space-y-4">
                        <FontAwesomeIcon icon={faGem} className="text-5xl text-center"/>
                        <h2 className="font-semibold">Financiamiento</h2>
                        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta reiciendis, provident dicta voluptate tempore voluptatum itaque fugiat? </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Description
