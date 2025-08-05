import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetVendorsDetailsQuery } from "../redux/apis/Vendorsapi";

const VendorsTotalOrders = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetVendorsDetailsQuery(id);

  const vendor = data?.shop;

  return (
    <div className=" bg-red-200 rounded-xl">
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-[350px]">
        <div className="grid grid-cols-7 font-semibold text-lg border-b px-6 py-4 bg-gray-50">
          <div>User</div>
          <div>Delivery Boy</div>
          <div>Food Category</div>
          <div>Order Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {isLoading ? (
          <div className="p-6 text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="p-6 text-red-500">Failed to load data</div>
        ) : (
          <div className="grid grid-cols-7 px-6 py-4 text-gray-700 border-b items-center text-base">
            <div>{vendor?.ownerName}</div>
            <div>{vendor?.hotelName}</div>
            <div className="text-gray-500">{vendor?.hotelAddress}</div>
            <div className="text-green-600 font-medium">{vendor?.createdAt?.substring(0, 10)}</div>
            <div className="text-gray-500">₹200</div>
            <div className="text-green-600">Completed</div>
            <div>
              <button className="text-red-500 hover:text-red-700">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsTotalOrders;
