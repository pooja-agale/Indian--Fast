import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiMenu } from "react-icons/fi";
import { RiFileAddLine } from "react-icons/ri";
// import { BsListCheck } from "react-icons/bs";
import { TbShoppingBag, TbTruckDelivery } from "react-icons/tb";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { LuShapes } from "react-icons/lu";
import { ImFilePicture } from "react-icons/im";
import logo from "/logo.png";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <FiHome /> },
  { name: "Manage Users", path: "/admin/manage-users", icon: <FiUser /> },
  { name: "Categories & Items", path: "/admin/categories", icon: <TbShoppingBag /> },
  { name: "Vendor", path: "/admin/vendor", icon: <GiForkKnifeSpoon /> },
  { name: "Transactions", path: "/admin/transactions", icon: <RiFileAddLine /> },
  { name: "Add Category", path: "/admin/add-category", icon: <LuShapes /> },
  { name: "Add Banner", path: "/admin/add-banner", icon: <ImFilePicture /> },
  {
    name: "Delivery Partners",
    path: "/admin/delivery-partners",
    icon: <TbTruckDelivery />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger icon - visible on small screens */}
      {!isOpen && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button onClick={toggleSidebar}>
            <FiMenu size={25} className="text-black" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative font-poppins inset-y-0 left-0 bg-white text-black h-screen transition-transform duration-300 z-40 p-4 w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Close button on small screens */}
        <button onClick={toggleSidebar} className="text-2xl mb-4 md:hidden">
          ✖
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-2">
          <img src={logo} alt="Logo" className="h-24" />
        </div>

        {/* Menu Items */}
        <nav className="space-y-2 mt-10 h-screen">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center gap-3 p-2 text-gray-400 rounded-full transition-colors ${
                  isActive ? "bg-[#FF9F03] text-white" : "text-black"
                }`}
              >
                <div
                  className={`p-2 rounded-full text-gray-400 transition ${
                    isActive ? "bg-white text-orange-500" : "text-black"
                  }`}
                >
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
