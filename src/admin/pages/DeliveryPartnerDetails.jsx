import React, { useState} from "react";
import { useGetAllDeliveryPartnerQuery } from "../redux/apis/DeliveryPartnerapi";

const DeliveryPartnerDetails = () => {
  const {
    data: deliveryPartners,
    isLoading,
    isError,
  } = useGetAllDeliveryPartnerQuery();

  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(""); // 👈 new

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load data.</p>
    );

  const partner = deliveryPartners?.drivers?.[0];
  if (!partner) return <p className="text-center mt-20">No data found.</p>;

  const openModal = (text, type) => {
    setModalContent(text);
    setModalType(type);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalType("");
  };

  return (
    <div className="px-6 pt-20 font-josefin">
      <div className="overflow-y-auto h-[calc(100vh-90px)] ">
        {/* Details Section */}
        <div className="bg-white rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-black">Details</h2>
          <div className="grid grid-cols-2 gap-6 text-md bg-[#D9D9D94D] p-6">
            <div>
              <label className="block text-gray-500 mb-1">
                Delivery Boy Name
              </label>
              <input
                type="text"
                value={partner.Name || ""}
                disabled
                className="w-full bg-white rounded-md p-3 text-black"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Email</label>
              <input
                type="text"
                value={partner.email || ""}
                disabled
                className="w-full bg-white rounded-md p-3 text-black"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Mobile No</label>
              <input
                type="text"
                value={partner.contactNo || ""}
                disabled
                className="w-full bg-white rounded-md p-3 text-black"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Address</label>
              <input
                type="text"
                value={partner.address || ""}
                disabled
                className="w-full bg-white rounded-md p-3 text-black"
              />
            </div>
          </div>

          {/* Vehicle Details */}
          <h2 className="text-xl font-semibold mb-4 text-black">
            Vehicle Details
          </h2>
          <div className="grid grid-cols-2 gap-6 text-md bg-[#D9D9D94D] p-6">
            <div>
              <label className="block text-gray-500 mb-1">Vehicle Type</label>
              <input
                type="text"
                value={partner.VehicleType || ""}
                disabled
                className="w-full bg-white rounded-md p-3 text-black"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Vehicle Name</label>
              <input
                type="text"
                value={partner.VehicleName || ""}
                disabled
                className="w-full bg-white rounded-md p-3 text-black"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">Vehicle Number</label>
              <input
                type="text"
                value={partner.VehicleNumber || ""}
                disabled
                className="w-full bg-white rounded-md p-3 text-black"
              />
            </div>
            <div>
              <label className="block text-gray-500 mb-1">RC Book No</label>
              <input
                type="text"
                value={partner.RCbookNumber || ""}
                disabled
                className="w-full bg-white rounded-md p-3 text-black"
              />
            </div>
          </div>

          {/* Document Details */}
          <h2 className="text-xl font-semibold mb-4 text-black">
            Document Details
          </h2>
          <div className="grid grid-cols-2 gap-6 text-md bg-[#D9D9D94D] p-6">
            <div>
              <label className="block text-gray-500 mb-1">
                RC Book / Registration Certificate
              </label>
              <div className="bg-white rounded-md p-3 flex justify-between">
                <p className="text-black text-sm">MH-MUM-SEA-2025-123456</p>
                <button
                  onClick={() => openModal(partner.RCbookNumber, "rc")}
                  className="text-blue-600 underline"
                >
                  View Document
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-500 mb-1">
                Driving License
              </label>
              <div className="bg-white rounded-md p-3 flex justify-between">
                <p className="text-black text-sm">MH-MUM-SEA-2025-123456</p>
                <button
                  onClick={() => openModal(partner.DrivingLicenceNo, "dl")}
                  className="text-blue-600 underline"
                >
                  View Document
                </button>
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-500 mb-1">
                ID Proof Document (Aadhar/Pan)
              </label>
              <div className="bg-white rounded-md p-3 flex justify-between">
                <p className="text-black text-sm">MH-MUM-SEA-2025-123456</p>
                <button
                  onClick={() => openModal(partner.IDProofNo, "aadhar")}
                  className="text-blue-600 underline"
                >
                  View Document
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Text Modal */}
        {modalContent && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg relative max-w-md w-full text-center">
              <h2 className="text-xl font-semibold mb-4 text-black">
                {modalType === "rc"
                  ? "RC Book / Registration Number"
                  : modalType === "dl"
                  ? "Driving License Number"
                  : modalType === "aadhar"
                  ? "Aadhar / PAN Number"
                  : "Document"}
              </h2>

              <p className="text-lg text-gray-800">{modalContent}</p>

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

export default DeliveryPartnerDetails;
