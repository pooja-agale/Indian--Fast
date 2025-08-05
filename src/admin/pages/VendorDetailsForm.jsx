import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetAllVendorsShopsQuery } from "../redux/apis/Vendorsapi";

const VendorDetailsForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const passedVendor = location.state; // 👈 This is your passed vendor shop data

  const {
    data: vendorsDetails,
    isLoading,
    isError,
  } = useGetAllVendorsShopsQuery(id, {
    skip: !!passedVendor || !id,
  });

  const vendor = passedVendor || vendorsDetails?.shops?.find((shop) => shop._id === id);

  if (!vendor && isLoading) return <div>Loading...</div>;
  if (!vendor) return <div>Error loading vendor data</div>;

  return (
    <div className="w-full p-4">
      <div className="bg-white p-4 rounded shadow max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Vendor Details</h2>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm">Owner Name</label>
            <input className="border p-2 rounded bg-gray-200" value={vendor.ownerName || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Owner Email</label>
            <input className="border p-2 rounded" value={vendor.ownerEmail || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Owner Number</label>
            <input className="border p-2 rounded" value={vendor.ownerNumber || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Owner Address</label>
            <input className="border p-2 rounded" value={vendor.ownerAddress || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Hotel Name</label>
            <input className="border p-2 rounded" value={vendor.hotelName || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Hotel Email</label>
            <input className="border p-2 rounded" value={vendor.hotelEmail || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Hotel Number</label>
            <input className="border p-2 rounded" value={vendor.hotelNumber || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Hotel Address</label>
            <input className="border p-2 rounded" value={vendor.hotelAddress || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">GST Number</label>
            <input className="border p-2 rounded" value={vendor.enterGSTNumber || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Food/Drug License No</label>
            <input className="border p-2 rounded" value={vendor.foodDrugLicenseNo || ""} disabled />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">Shop Act License No</label>
            <input className="border p-2 rounded" value={vendor.shopActLicenseNo || ""} disabled />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorDetailsForm;
