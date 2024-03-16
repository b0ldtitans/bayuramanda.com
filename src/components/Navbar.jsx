import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoReorderThreeOutline, IoClose } from "react-icons/io5";
import { api } from "../api";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const adminPath = location.pathname.includes("/admin");

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/category");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <nav
      className={`flex mb-12 flex-row justify-between md:justify-center ${
        adminPath ? "hidden" : ""
      }`}
    >
      <div className="flex flex-col items-center justify-center md:p-8 gap-y-6">
        <a
          href={"/"}
          className="flex items-center justify-center px-8 py-12 md:px-0"
        >
          <img src={logo} alt="logo" width={300} height={300} />
        </a>

        {/* <---------------------------------------- DESKTOP NAVBAR ---------------------------------------->  */}
        {!isLoading && (
          <div className="flex-row items-center hidden px-4 text-sm font-light uppercase justify-evenly md:flex text-neutral-500 gap-x-16 ">
            {categories.map((link) => (
              <a key={link.id} href={`/?categoryName=${link.name}`}>
                {link.name}
              </a>
            ))}
            <button onClick={() => navigate("/about")}>ABOUT</button>
            <button onClick={() => navigate("/contact")}>CONTACT</button>
          </div>
        )}
      </div>
      {/* <---------------------------------------- END OF DESKTOP NAVBAR ---------------------------------------->  */}

      {/* <---------------------------------------- MOBILE NAVBAR ----------------------------------------> */}
      <div className="flex p-4 md:hidden">
        <button
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
          }}
          className="relative z-50 flex flex-col justify-between p-4 uppercase transition-all duration-300 ease-in-out transform"
        >
          {isMenuOpen ? (
            <IoClose size={50} />
          ) : (
            <IoReorderThreeOutline size={50} />
          )}
        </button>
        {isMenuOpen && (
          <div
            className={`absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen gap-8 text-4xl bg-white text-neutral-600 transition-all duration-300 ease-in-out transform`}
          >
            {categories.map((link) => (
              <a
                onClick={() => setIsMenuOpen(false)}
                key={link.id}
                href={`/?categoryName=${link.name}`}
              >
                <button>{link.name}</button>
              </a>
            ))}
            <button onClick={() => navigate("/about")}>About</button>
            <button onClick={() => navigate("/contact")}>Contact</button>
          </div>
        )}
      </div>
      {/* <---------------------------------------- END OF MOBILE NAVBAR ----------------------------------------> */}
    </nav>
  );
}
