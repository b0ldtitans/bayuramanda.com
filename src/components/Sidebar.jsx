import { ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdPhotos } from "react-icons/io";
import { TfiDashboard } from "react-icons/tfi";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlLogout, SlSettings } from "react-icons/sl";
import { FaTrashRestore } from "react-icons/fa";
import Cookies from "js-cookie";
import { api, imgBaseURL } from "../api";
import logo from "../assets/logo.png";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const userData = async () => {
      try {
        const response = await api.get("/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const reponseData = response.data.user;
          setUser(reponseData);
        }
      } catch (error) {}
    };

    userData();
  }, []);

  const logoutHandler = () => {
    Cookies.remove("token");
    Cookies.remove("isLoggedIn");
    navigate("/");
  };

  const profilePicture = user?.profilePicture
    ? `${imgBaseURL}/${user.profilePicture}`
    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1200px-Missing_avatar.svg.png";

  return (
    <aside className={` h-screen`}>
      <nav className="flex h-full flex-col border-r bg-white shadow-sm">
        <div className={`flex items-center justify-between p-4 pb-2`}>
          <button
            onClick={() => navigate("/")}
            className={`${expanded ? "" : "hidden"} cursor-pointer p-4`}
          >
            <img
              src={logo}
              alt="logo"
              width={300}
              height={300}
              className={`cursor-pointer overflow-hidden transition-all ${
                expanded ? "w-32" : "hidden w-0"
              }`}
            />
          </button>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {/* <SidebarItem
              icon={<TfiDashboard size={20} />}
              text="Dashboard"
              active={location.pathname === "/admin/dashboard"}
              onClick={() => navigate("/admin/dashboard")}
            /> */}
            <SidebarItem
              icon={<IoMdPhotos size={20} />}
              text="Albums"
              active={location.pathname === "/admin/dashboard/albums"}
              onClick={() => navigate("/admin/dashboard/albums")}
            />
            {/* <SidebarItem
              icon={<LuLayoutDashboard size={20} />}
              text="Categories"
              active={location.pathname === "/admin/dashboard/categories"}
              onClick={() => navigate("/admin/dashboard/categories")}
            /> */}
            <SidebarItem
              icon={<FaTrashRestore size={20} />}
              text="Recover"
              active={location.pathname === "/admin/dashboard/recover"}
              onClick={() => navigate("/admin/dashboard/recover")}
            />
            <SidebarItem
              icon={<SlSettings size={20} />}
              onClick={() => navigate("/admin/dashboard/setting")}
              active={location.pathname === "/admin/dashboard/setting"}
              text="Settings"
            />
            <div className="p-4">
              <div className="w-full border border-gray-400 " />
            </div>
            <SidebarItem
              onClick={logoutHandler}
              icon={<SlLogout size={20} />}
              text="Logout"
            />
          </ul>
        </SidebarContext.Provider>

        <div className="flex border-t p-3 ">
          <img
            src={profilePicture}
            alt=""
            className={`h-10 w-10 rounded-md`}
            width={512}
            height={512}
          />
          <div
            className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="text-xs font-semibold">{user?.fullname}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick}
      className={`
        group relative my-1 flex cursor-pointer items-center
        rounded-md px-3 py-2
        font-medium transition-colors duration-0
        ${active ? "bg-black text-white" : "text-gray-600 hover:bg-black/20 "}
    `}
    >
      {icon}
      <span
        className={`overflow-hidden  transition-all ${
          expanded ? "ml-3 w-52" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
          invisible absolute left-full z-50 ml-6 -translate-x-3
          rounded-md bg-black px-2
          py-1 text-sm text-white
          transition-all group-hover:visible group-hover:translate-x-0
          group-hover:opacity-100
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
