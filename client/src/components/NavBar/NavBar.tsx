import Link from "next/link"
import Logo from "./Logo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons"

const NavBar = () => {
  return (
    <nav
      className="w-full flex justify-start items-center space-x-16 py-8 px-10 border border-t-0 border-x-0 border-b-grey"
    >
      <Logo />
      <div className="flex items-center justify-around space-x-4">
        <NavLink to='/'>Inicio</NavLink>
        <NavLink to='/cars'>Vehiculos</NavLink>
        <NavLink to='/about'>Acerca de</NavLink>
        <NavLink to='/contact'>Contacto</NavLink>
        <span className="font-medium">
        <FontAwesomeIcon icon={faMobileScreen} />
        +54 343 5123 789
        </span>
      </div>
    </nav>
  )
}

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
};

const NavLink = ({ children, to }: NavLinkProps) => {
  return (
    <Link href={to}>
      <button className="font-medium">
        {children}
      </button>
    </Link>
  );
};

export default NavBar
