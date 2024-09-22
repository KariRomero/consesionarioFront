import Link from "next/link";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full bg-white flex flex-wrap justify-between items-center z-50 px-4 py-4 md:py-6 lg:py-8"
    >
      <Logo />
      <div className="flex flex-wrap justify-center items-center space-x-4 md:space-x-6 lg:space-x-8">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/cars">Vehiculos</NavLink>
        <NavLink to="/about">Acerca de</NavLink>
        <NavLink to="/contact">Contacto</NavLink>
        {/* <span className="font-medium">
          <FontAwesomeIcon icon={faMobileScreen} />
          +54 343 5123 789
        </span> */}
      </div>
    </nav>
  );
};

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
};

const NavLink = ({ children, to }: NavLinkProps) => {
  return (
    <Link href={to}>
      <button className="font-medium">{children}</button>
    </Link>
  );
};

export default NavBar;