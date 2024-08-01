import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ExitIcon from "../icons/ExitIcon";
import MenuIcon from "../icons/MenuIcon";
import ClientsButton from "./buttons/ClientsButton";
import LogOutButton from "./buttons/LogOutButton";
import OrdersButton from "./buttons/ProyectsButton";
import UsersButton from "./buttons/UsersButton";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import logo from "../assets/logo_4.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsDrawerOpen(false); // Cerrar el drawer cada vez que cambia la ruta
  }, [location]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-[#58aaae] shadow-lg">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                className=" mt-0 hover:bg-orange-100 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                type="button"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)} // Alternar visibilidad del drawer
                aria-controls="drawer-navigation"
              >
                <MenuIcon />
              </button>

              <a href="/" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:">
                  <img src={logo} alt="logo" className="w-32" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Menus */}
      <div
        id="drawer-navigation"
        className={`fixed mt-4 top-12 left-0 z-50 w-64 h-screen bg-white shadow-2xl p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <OrdersButton />
            {(user?.role === "Administrador" || user?.role === "manager") && (
              <>
                <ClientsButton />
                <UsersButton />
              </>
            )}
            <LogOutButton />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
