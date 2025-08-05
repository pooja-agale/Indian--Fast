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
import { useGetVendorsDetailsQuery } from "../redux/apis/Vendorsapi";

const VendorDetails = () => {
  const { id } = useParams();
  const [showSection, setShowSection] = useState("orders");
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
        {/* Total Orders */}
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

        {/* Total Food Item */}
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

        {/* Total Revenue */}
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

      {/* Dynamic Section Content */}
      {showSection === "orders" && (
        <div className="pt-8 px-8">
          <VendorsTotalOrders />
        </div>
      )}

      {showSection === "food" && (
        <div className="pt-8 px-8">
          <VendorTotalFoodItem />
        </div>
      )}

      {showSection === "revenue" && (
        <div className="pt-8 px-8">
          <VendorTotalRevenu />
        </div>
      )}

      {/* Optional: Vendor Details Section */}
      {showSection === "details" && (
        <div className="p-8 pb-0">
          <div className="bg-white rounded-xl p-6 mb-6 space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Vendor Details
            </h2>

            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : isError ? (
              <p className="text-red-500">Failed to load vendor details</p>
            ) : (
              <div className="grid grid-cols-2 gap-6 text-md bg-[#D9D9D94D] p-6">
                <div>
                  <label className="block text-gray-500 mb-1">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    value={vendor?.ownerName || ""}
                    disabled
                    className="w-full bg-white rounded-md p-3 text-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Email</label>
                  <input
                    type="text"
                    value={vendor?.ownerEmail || ""}
                    disabled
                    className="w-full bg-white rounded-md p-3 text-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Mobile No</label>
                  <input
                    type="text"
                    value={vendor?.ownerNumber || ""}
                    disabled
                    className="w-full bg-white rounded-md p-3 text-black"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">Address</label>
                  <input
                    type="text"
                    value={vendor?.ownerAddress || ""}
                    disabled
                    className="w-full bg-white rounded-md p-3 text-black"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDetails;
