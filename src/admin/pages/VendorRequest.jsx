import React from "react";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  useGetAllVendorsShopsQuery,
  useUpdateVendorStatusMutation,
} from "../redux/apis/Vendorsapi";

const VendorRequest = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useGetAllVendorsShopsQuery();
  const [updateVendorStatus, { isLoading: isUpdating }] = useUpdateVendorStatusMutation();

  const pendingVendors = (data?.shops || []).filter(
    (shop) => shop.isApproved?.toLowerCase() === "pending"
  );

  const handleStatusUpdate = async (vendorId, newStatus) => {
    try {
      await updateVendorStatus({ id: vendorId, status: newStatus }).unwrap();
      refetch(); // Refresh vendor list after update
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="px-4 pt-20 lg:px-6">
      <div className="bg-white rounded-xl shadow-md overflow-x-auto lg:h-[600px]">
        {/* Header */}
        <div className="hidden lg:grid grid-cols-7 font-semibold text-lg border-b px-6 py-4">
          <div>Name</div>
          <div>Contact No</div>
          <div>Address</div>
          <div>Email</div>
          <div>Details</div>
          <div>Register Date</div>
          <div>Action</div>
        </div>

        {/* Conditional rendering */}
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">Failed to load requests.</div>
        ) : pendingVendors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No pending requests found.</div>
        ) : (
          pendingVendors.map((vendor) => (
            <div
              key={vendor._id}
              className="grid grid-cols-1 lg:grid-cols-7 px-6 py-4 text-gray-700 border-b text-base gap-y-2 lg:gap-y-0 items-start lg:items-center"
            >
              <div><span className="lg:hidden font-semibold">Name: </span>{vendor.ownerName}</div>
              <div><span className="lg:hidden font-semibold">Contact: </span>{vendor.ownerNumber}</div>
              <div className="whitespace-pre-wrap text-gray-500">
                <span className="lg:hidden font-semibold">Address: </span>{vendor.ownerAddress}
              </div>
              <div className="text-gray-500">
                <span className="lg:hidden font-semibold">Email: </span>{vendor.ownerEmail}
              </div>
              <div>
                <span className="lg:hidden font-semibold">Details: </span>
                <button
                  onClick={() => navigate(`/admin/vendor-details/${vendor._id}`, { state: vendor })}
                  className="text-blue-600 underline p-1"
                >
                  View
                </button>
              </div>
              <div className="text-gray-400">
                <span className="lg:hidden font-semibold">Register Date: </span>
                {new Date(vendor.createdAt).toLocaleDateString()}
              </div>
              <div className="space-x-3 flex items-center">
                <span className="lg:hidden font-semibold">Action: </span>
                <button
                  className="text-[#0F9A03] disabled:opacity-50"
                  onClick={() => handleStatusUpdate(vendor._id, "approved")}
                  disabled={isUpdating}
                  title="Approve"
                >
                  <IoIosCheckmarkCircle size={26} />
                </button>
                <button
                  className="text-red-500 disabled:opacity-50"
                  onClick={() => handleStatusUpdate(vendor._id, "rejected")}
                  disabled={isUpdating}
                  title="Reject"
                >
                  <MdCancel size={26} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VendorRequest;
