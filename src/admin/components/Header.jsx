import { useLocation } from "react-router-dom";
import { useState } from "react";
import UserProfile from "../pages/UserProfile"; // Adjust the path as needed

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const [showProfile, setShowProfile] = useState(false);

  const titles = {
    "/": "Dashboard",
    "/manage-users": "Manage Users",
    "/categories": "Categories & Items",
    "/vendor": "Vendors",
    "/delivery-partners": "Delivery Partners",
    "/addProduct": "Add Product",
    "/Sub-Category": "Sub Category",
    "/transactions": "Transaction",
    "/add-category": "Add Category",
    "/add-banner": "Add Banner",
    "/request": "Request",
  };

  let pageTitle = titles[path] || "";
  if (path.startsWith("/vendor-details")) {
    pageTitle = "Vendor Details";
  } else if (path.startsWith("/delivery-partners/")) {
    pageTitle = "Delivery Partner Details";
  } else if (path.startsWith("/user-details/")) {
    pageTitle = "User Details";
  }

  return (
    <>
      <header className="h-16 w-full fixed flex items-center justify-between font-poppins text-black bg-white p-4 shadow-md z-40">
        {/* Title */}
        <div className="text-xl font-semibold ml-10 md:ml-64 text-black">{pageTitle}</div>

        {/* User Icon */}
        <div
          onClick={() => setShowProfile(true)}
          className="bg-[#FF9F03] px-4 py-2 rounded-full cursor-pointer"
        >
          <p className="text-white text-xl">A</p>
        </div>
      </header>

      {/* Slide-in User Profile */}
      <div
        className={`fixed top-0 right-0 w-full max-w-sm bg-white z-50 min-h-screen shadow-lg transition-transform duration-300 ease-in-out rounded-tl-3xl rounded-bl-3xl ${
          showProfile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <UserProfile onClose={() => setShowProfile(false)} />
      </div>
    </>
  );
};

export default Header;
