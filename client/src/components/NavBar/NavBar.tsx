import Link from "next/link";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white flex justify-between items-center py-4 px-10 shadow-md" style={{ height: '60px' }}>
      {/* Altura fija de 60px */}
      <Logo />
      <div className="flex items-center space-x-4">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/cars">Vehículos</NavLink>
        <NavLink to="/about">Acerca de</NavLink>
        <NavLink to="/contact">Contacto</NavLink>
        <span className="font-medium hidden lg:block">
          <FontAwesomeIcon icon={faMobileScreen} className="mr-2" />
          +54 343 5123 789
        </span>
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