import React from "react";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDeliveryPartnerQuery,
  useUpdateDeliveryPartnerStatusMutation,
} from "../redux/apis/DeliveryPartnerapi";

const DeliveryPartnerRequest = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllDeliveryPartnerQuery();

  const [updateStatus] = useUpdateDeliveryPartnerStatusMutation();

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      alert(`Status updated to ${status}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update status");
    }
  };

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError) return <p className="text-center mt-20 text-red-500">Failed to load data.</p>;

  return (
    <div className="h-full px-6 pt-20">
      <div className="bg-white rounded-xl shadow-md overflow-x-auto h-[600px]">
        <div className="min-w-[1000px]">
          {/* Table Header */}
          <div className="grid grid-cols-7 font-semibold text-lg border-b px-6 py-4 ">
            <div className="min-w-[140px]">Name</div>
            <div className="min-w-[140px]">Contact No</div>
            <div className="min-w-[200px]">Address</div>
            <div className="min-w-[220px]">Email</div>
            <div className="min-w-[120px]">Details</div>
            <div className="min-w-[160px]">Register Date</div>
            <div className="min-w-[120px]">Action</div>
          </div>

          {/* Table Rows */}
          {data?.drivers?.map((partner) => (
            <div
              key={partner._id}
              className="grid grid-cols-7 px-6 py-4 text-gray-700 border-b items-center text-base"
            >
              <div className="break-words">{partner.Name}</div>
              <div className="break-words">{partner.contactNo}</div>
              <div className="whitespace-pre-wrap text-gray-500 break-words">{partner.address}</div>
              <div className="text-gray-500 break-words">{partner.email}</div>
              <div>
                <button
                  onClick={() => navigate(`/admin/delivery-partners/${partner._id}`)}
                  className="text-blue-600 underline p-2"
                >
                  View
                </button>
              </div>
              <div className="text-gray-400">
                {new Date(partner.createdAt).toLocaleDateString()}
              </div>
              <div className="space-x-3 flex">
                <button
                  className="text-[#0F9A03]"
                  onClick={() => handleStatusUpdate(partner._id, "approved")}
                >
                  <IoIosCheckmarkCircle size={30} />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleStatusUpdate(partner._id, "rejected")}
                >
                  <MdCancel size={30} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerRequest;
