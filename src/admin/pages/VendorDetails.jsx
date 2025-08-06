import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import VendorsTotalOrders from "./VendorsTotalOrders";
import VendorTotalFoodItem from "./VendorTotalFoodItem";
import VendorTotalRevenu from "./VendorTotalRevenu";
import VendorDetailsForm from "./VendorDetailsForm.jsx";
import { useGetVendorsDetailsQuery } from "../redux/apis/Vendorsapi";

const VendorDetails = () => {
  const { id } = useParams();
  const [showSection, setShowSection] = useState("details"); // default to form
  const { data: vendor, isLoading, isError } = useGetVendorsDetailsQuery(id);

  return (
    <div className="pt-12 px-4">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center p-8 gap-x-6">
          <FaUserCircle className="text-[#FF9F03]" size={60} />
          <h1 className="text-black text-2xl">
            {vendor?.shop?.ownerName || ""}
          </h1>
        </div>
        <div className="flex text-black items-center p-8">
          <IoCallOutline size={40} className="mr-2" />
          <h3 className="text-xl mr-8">{vendor?.shop?.ownerNumber || ""}</h3>
          <CiTrash className="text-red-600" size={30} />
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex text-black gap-12 justify-center px-8 cursor-pointer">
        <div
          onClick={() => setShowSection("orders")}
          className={`bg-white p-5 space-y-3 w-1/3 rounded-xl transition ${
            showSection === "orders" ? "border-2 border-[#FF9F03]" : ""
          }`}
        >
          <h4 className="text-2xl">Total Orders</h4>
          <div className="flex gap-4 items-center">
            <LuCalendarDays className="text-[#FF9F03]" size={30} />
            <h4 className="text-3xl">35</h4>
          </div>
        </div>

        <div
          onClick={() => setShowSection("food")}
          className={`bg-white p-5 space-y-3 w-1/3 rounded-xl transition ${
            showSection === "food" ? "border-2 border-[#FF9F03]" : ""
          }`}
        >
          <h4 className="text-2xl">Total Food Item</h4>
          <div className="flex gap-4 items-center">
            <MdOutlineShoppingCart className="text-[#FF9F03]" size={30} />
            <h4 className="text-3xl">35</h4>
          </div>
        </div>

        <div
          onClick={() => setShowSection("revenue")}
          className={`bg-white p-5 space-y-3 w-1/3 rounded-xl transition ${
            showSection === "revenue" ? "border-2 border-[#FF9F03]" : ""
          }`}
        >
          <h4 className="text-2xl">Total Revenue</h4>
          <div className="flex gap-4 items-center">
            <h4 className="text-3xl">{"\u20B9"}32,135</h4>
          </div>
        </div>
      </div>

      {/* Vendor Details Form with scroll */}
      {showSection === "details" && (
        <div className="">
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Failed to load vendor details</p>
          ) : (
            <div className="">
              <VendorDetailsForm passedVendor={vendor?.shop} />
            </div>
          )}
        </div>
      )}

      {/* Orders */}
      {showSection === "orders" && (
        <div className="pt-8 px-8">
          <VendorsTotalOrders />
        </div>
      )}

      {/* Food Items */}
      {showSection === "food" && (
        <div className="pt-8 px-8">
          <VendorTotalFoodItem />
        </div>
      )}

      {/* Revenue */}
      {showSection === "revenue" && (
        <div className="pt-8 px-8">
          <VendorTotalRevenu />
        </div>
      )}
    </div>
  );
};

export default VendorDetails;
