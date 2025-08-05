import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDeliveryPartnerQuery,
  useDeleteDeliveryPartnerMutation,
} from "../redux/apis/DeliveryPartnerapi";

const DeliveryPartners = () => {
  const navigate = useNavigate();

  // ✅ Always call hooks at the top level
  const {
    data: deliveryPartners,
    isLoading,
    isError,
  } = useGetAllDeliveryPartnerQuery();
  const [deletePartner] = useDeleteDeliveryPartnerMutation(); // ✅ moved here

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      try {
        await deletePartner(id).unwrap();
        alert("Deleted successfully");
        refetch(); // ✅ manually refresh data
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-20">Loading delivery partners...</p>;
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">
        Failed to load delivery partners.
      </p>
    );

  return (
    <div className="  pt-20 px-4">
      {/* Top Right Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          onClick={() => navigate("/admin/request")}
        >
          View Requests
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto h-[540px]">
        <div className="min-w-[1000px]">
          {/* Header */}
          <div className="grid grid-cols-7 font-semibold text-base border-b px-6 py-4">
            <div className="min-w-[120px]">Name</div>
            <div className="min-w-[120px]">Contact No</div>
            <div className="min-w-[200px]">Address</div>
            <div className="min-w-[200px]">Email</div>
            <div className="min-w-[100px]">Details</div>
            <div className="min-w-[140px]">Register Date</div>
            <div className="min-w-[80px]">Action</div>
          </div>

          {/* Rows */}
          {deliveryPartners?.drivers
            ?.filter((partner) => partner.status?.toLowerCase() === "approved")
            .map((partner) => (
              <div
                key={partner._id}
                className="grid grid-cols-7 px-6 py-4 text-gray-700 border-b items-center text-base"
              >
                <div className="break-words">{partner.Name}</div>
                <div>{partner.contactNo}</div>
                <div className="whitespace-pre-wrap text-gray-500 break-words">
                  {partner.address}
                </div>
                <div className="text-gray-500 break-words">{partner.email}</div>
                <div>
                  <button
                    onClick={() =>
                      navigate(`/admin/delivery-partners/${partner._id}`)
                    }
                    className="text-blue-600 underline p-2"
                  >
                    View
                  </button>
                </div>
                <div className="text-gray-400">
                  {new Date(partner.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(partner._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartners;
