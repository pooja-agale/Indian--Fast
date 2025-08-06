import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { CiTrash } from "react-icons/ci";
import { LuCalendarDays, LuNotebookPen } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import TotalPurchase from "../pages/TotalPurchase";
import { useGetAllUsersQuery } from '../redux/apis/Userapis';

const UserDetails = () => {
  const { id } = useParams();
  const { data: userData, isError, isLoading } = useGetAllUsersQuery();

  const [showTable, setShowTable] = useState(false);
  const [orderType, setOrderType] = useState("completed");

  // Find the specific user by ID
  const user = userData?.find((u) => u._id === id);

  const handleShowPurchases = () => {
    setOrderType("completed");
    setShowTable(true);
  };

  const handleShowOngoingOrders = () => {
    setOrderType("ongoing");
    setShowTable(true);
  };

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading user details...</p>;
  }

  if (isError || !user) {
    return <p className="text-center mt-10 text-red-500">User not found or failed to load.</p>;
  }

  return (
    <div className="pt-12 px-4">
      <div className="flex justify-between">
        <div className="flex items-center p-8 gap-x-6">
          <FaUserCircle className="text-[#FF9F03]" size={60} />
          <h1 className="text-black text-2xl">{user.Name}</h1>
        </div>
        <div className="flex text-black items-center p-8">
          <IoCallOutline size={40} className="mr-2" />
          <h3 className="text-xl mr-8">{user.contactNo}</h3>
          <CiTrash className="text-red-600" size={30} />
        </div>
      </div>

      <div className="flex text-black gap-12 justify-center px-8">
        <div className="bg-white p-5 space-y-3 w-1/3 rounded-xl">
          <h4 className="text-2xl">Account Creation</h4>
          <div className="flex gap-4 items-center">
            <LuCalendarDays className="text-[#FF9F03]" size={30} />
            <h4 className="text-xl text-gray-300">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </h4>
          </div>
        </div>

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

      {showTable && (
        <div className="pt-8 px-8">
          <TotalPurchase type={orderType} />
        </div>
      )}
    </div>
  );
};

export default UserDetails;
