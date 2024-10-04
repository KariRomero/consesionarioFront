import Link from "next/link";
import Logo from "./Logo";

const NavBar: React.FC = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full bg-white flex flex-wrap justify-between items-center z-50 px-4 py-4 md:py-6 lg:py-8"
    >
      <Logo />
      <div className="flex flex-wrap justify-center items-center space-x-4 md:space-x-6 lg:space-x-8">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/cars">Vehículos</NavLink>
        <NavLink to="/contact">Contacto</NavLink>     
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