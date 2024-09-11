import Link from "next/link"
import Logo from "./Logo"

const NavBar = () => {
  return (
    <nav className="w-full flex justify-start items-center space-x-16 py-8 px-10">
      <Logo />
      <div className="flex items-center justify-around space-x-4">
      <NavLink to='/'>Inicio</NavLink>
      <NavLink to='/cars'>Vehiculos</NavLink>
      <NavLink to='/about'>Acerca de</NavLink>
      <NavLink to='/contact'>Contacto</NavLink>
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
      <button>{children}</button>
    </Link>
  );
};

export default NavBar
