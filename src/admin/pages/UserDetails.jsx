import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { LuCalendarDays, LuNotebookPen } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import TotalPurchase from "../pages/TotalPurchase";

const UserDetails = () => {
  const { id } = useParams();

  const [showTable, setShowTable] = useState(false);
  const [orderType, setOrderType] = useState("completed");

  const handleShowPurchases = () => {
    setOrderType("completed");
    setShowTable(true);
  };

  const handleShowOngoingOrders = () => {
    setOrderType("ongoing");
    setShowTable(true);
  };

  return (
    <div className=" pt-12 px-4 ">
      <div className="flex justify-between">
        <div className="flex items-center p-8 gap-x-6">
          <FaUserCircle className="text-[#FF9F03]" size={60} />
          <h1 className="text-black text-2xl">John Doe</h1>
        </div>
        <div className="flex text-black items-center p-8">
          <IoCallOutline size={40} className="mr-2" />
          <h3 className="text-xl mr-8">8888445555</h3>
          <CiTrash className="text-red-600" size={30} />
        </div>
      </div>

      <div className="flex text-black gap-12 justify-center px-8">
        {/* Static card */}
        <div className="bg-white p-5 space-y-3 w-1/3 rounded-xl">
          <h4 className="text-2xl">Account Creation</h4>
          <div className="flex gap-4 items-center">
            <LuCalendarDays className="text-[#FF9F03]" size={30} />
            <h4 className="text-xl text-gray-300">12/02/2025</h4>
          </div>
        </div>

        {/* Total Purchases card */}
        <div
          onClick={handleShowPurchases}
          className={`bg-white p-5 space-y-3 w-1/3 rounded-xl cursor-pointer transition ${
            orderType === "completed" && showTable ? "border-2 border-[#FF9F03]" : "border-2 border-transparent"
          }`}
        >
          <h4 className="text-2xl">Total Purchases</h4>
          <div className="flex gap-4 items-center">
            <MdOutlineShoppingCart className="text-[#FF9F03]" size={30} />
            <h4 className="text-3xl">3</h4>
          </div>
        </div>

        {/* Ongoing Orders card */}
        <div
          onClick={handleShowOngoingOrders}
          className={`bg-white p-5 space-y-3 w-1/3 rounded-xl cursor-pointer transition ${
            orderType === "ongoing" && showTable ? "border-2 border-[#FF9F03]" : "border-2 border-transparent"
          }`}
        >
          <h4 className="text-2xl">Ongoing Orders</h4>
          <div className="flex gap-4 items-center">
            <LuNotebookPen className="text-[#FF9F03]" size={30} />
            <h4 className="text-3xl">1</h4>
          </div>
        </div>
      </div>

      {/* Table section */}
      {showTable && (
        <div className="pt-8 px-8">
          <TotalPurchase type={orderType} />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
