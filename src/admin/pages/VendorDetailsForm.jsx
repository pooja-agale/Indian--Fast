import React, { useState } from "react";
import { useGetAllVendorsShopsQuery } from "../redux/apis/Vendorsapi";

const VendorDetailsForm = ({ id, passedVendor }) => {
  const {
    data: vendorsDetails,
    isLoading,
    isError,
  } = useGetAllVendorsShopsQuery(); // 🔧 Fetch all vendors once, not per ID

  // Prefer passedVendor if available; else search in fetched list
  const vendor =
    passedVendor ||
    vendorsDetails?.shops?.find((shop) => shop._id === id);

  if (!vendor && isLoading) return <div>Loading...</div>;
  if (!vendor) return <div>Error loading vendor data</div>;

  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState("");

  const openModal = (text, type) => {
    setModalContent(text);
    setModalType(type);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalType("");
  };

  return (
    <div className="w-full px-7 py-4">
      <div className="bg-white p-4 rounded-2xl max-h-[53vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-black mb-6">
          Vendor Details
        </h2>

        {/* Owner Details */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-5 mb-4 rounded-xl">
          <Input label="Owner Name" value={vendor.ownerName} />
          <Input label="Owner Email" value={vendor.ownerEmail} />
          <Input label="Owner Number" value={vendor.ownerNumber} />
          <Input label="Owner Address" value={vendor.ownerAddress} />
        </form>

        {/* Shop Details */}
        <h3 className="text-xl font-semibold text-black mb-4">Shop Details</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-5 mb-4 rounded-xl">
          <Input label="Hotel Name" value={vendor.hotelName} />
          <Input label="Hotel Email" value={vendor.hotelEmail} />
          <Input label="Hotel Number" value={vendor.hotelNumber} />
          <Input label="Hotel Address" value={vendor.hotelAddress} />
        </form>

        {/* License Details */}
        <h3 className="text-xl font-semibold text-black mb-4">Document Details</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-5 rounded-xl">
          <DocField
            label="GST Number"
             placeholder={"MH-MUM-SEA-2024-123456"}
            onView={() => openModal(vendor.enterGSTNumber, "GST Number")}
          />
          <DocField
            label="Shop Act License Number"
            placeholder={"MH-MUM-SEA-2024-123456"}
            onView={() => openModal(vendor.shopActLicenseNo, "Shop Act License")}
          />
          <DocField
            label="Fruit & Drug License Number"
             placeholder={"MH-MUM-SEA-2024-123456"}
            onView={() => openModal(vendor.foodDrugLicenseNo, "Food & Drug License")}
          />
          <DocField
            label="Clerk's License Number"
             placeholder={"MH-MUM-SEA-2024-123456"}
            onView={() => openModal(vendor.clerkLicenseNo, "Clerk License")}
          />
        </form>

        {/* Modal */}
        {modalContent && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg relative max-w-md w-full text-center">
              <h2 className="text-xl font-semibold mb-4 text-black">
                {modalType}
              </h2>
              <p className="text-gray-800 break-all">{modalContent}</p>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-red-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 🔧 Reusable disabled input
const Input = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-sm mb-2">{label}</label>
    <input
      className="p-3 rounded bg-white text-black"
      value={value || ""}
      disabled
    />
  </div>
);

// 🔧 Reusable document view field
const DocField = ({ label, placeholder, onView }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-500 mb-2">{label}</label>
    <div className="flex items-center justify-between bg-white p-3 rounded">
      <span className="text-black">{placeholder || "N/A"}</span>
      <button
        type="button"
        onClick={onView}
        className="text-blue-600 underline text-sm"
      >
        View Document
      </button>
    </div>
  </div>
);

export default VendorDetailsForm;
