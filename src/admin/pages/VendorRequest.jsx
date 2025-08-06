import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  useGetAllVendorsShopsQuery,
  useUpdateVendorStatusMutation,
} from "../redux/apis/Vendorsapi";
import VendorDetailsForm from "./VendorDetailsForm";
import { useParams, useNavigate } from "react-router-dom";

const VendorRequest = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetAllVendorsShopsQuery();
  const [updateVendorStatus, { isLoading: isUpdating }] =
    useUpdateVendorStatusMutation(id);

  const navigate = useNavigate();

  const [selectedVendorId, setSelectedVendorId] = useState(null); // 🆕 modal state
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(false);

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

  const handleViewClick = (vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedVendor(null);
    setIsModalOpen(false);
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

        {/* Vendor List */}
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            Failed to load requests.
          </div>
        ) : pendingVendors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No pending requests found.
          </div>
        ) : (
          pendingVendors.map((vendor) => (
            <div
              key={vendor._id}
              className="grid grid-cols-1 lg:grid-cols-7 px-6 py-4 text-gray-700 border-b text-base gap-y-4 lg:gap-y-0 items-start lg:items-center space-y-4 lg:space-y-0"
            >
              <div>
                <span className="lg:hidden font-semibold">Name: </span>
                {vendor.ownerName}
              </div>
              <div>
                <span className="lg:hidden font-semibold">Contact: </span>
                {vendor.ownerNumber}
              </div>
              <div className="whitespace-pre-wrap text-gray-500">
                <span className="lg:hidden font-semibold">Address: </span>
                {vendor.ownerAddress}
              </div>
              <div className="text-gray-500">
                <span className="lg:hidden font-semibold">Email: </span>
                {vendor.ownerEmail}
              </div>
              <div>
                <span className="lg:hidden font-semibold">Details: </span>
                <button
                  onClick={() => handleViewClick(vendor)}
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

      {/* 🆕 VendorDetailsForm as Modal */}
      {isModelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg relative max-w-3xl w-full">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-red-600 text-2xl font-bold"
            >
              ✕
            </button>

            {/* RENDER THE VENDOR FORM HERE */}
            <VendorDetailsForm passedVendor={selectedVendor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorRequest;
