import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  useGetAllVendorsShopsQuery,
  useDeleteVendorsShopsMutation,
} from "../redux/apis/Vendorsapi";

const Vendor = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useGetAllVendorsShopsQuery();
  const [deleteVendorShop, { isLoading: isDeleting }] = useDeleteVendorsShopsMutation();

  const shops = (data?.shops || []).filter((shop) => shop.isApproved?.toLowerCase() === "approved");
  console.log(data);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vendor shop?")) {
      try {
        await deleteVendorShop(id).unwrap();
        refetch(); // Refresh the vendor list after deletion
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete vendor shop. Try again.");
      }
    }
  };

  return (
    <div className="font-josefin pt-20 px-4">
      {/* Top Button */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-4">
        <button
          className="bg-[#3F9224] rounded-2xl text-white text-base px-6 py-3 hover:bg-[#34781e] transition-all"
          onClick={() => navigate("/admin/vendor-request")}
        >
          View Requests
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border h-[540px] bg-white border-gray-200 shadow-sm">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="text-center font-normal text-lg border border-b text-black/70">
              <th className="px-6 py-4">Vendor Name</th>
              <th className="px-6 py-4">Shop Name</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">Contact No</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Register Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-red-500">
                  Failed to load vendors.
                </td>
              </tr>
            ) : shops.length > 0 ? (
              shops.map((shop) => (
                <tr
                  key={shop._id}
                  className="text-center text-base border border-b text-[#B8B8B8] hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{shop.ownerName || "N/A"}</td>
                  <td className="px-6 py-4">{shop.hotelName || "N/A"}</td>
                  <td className="px-6 py-4">{shop.ownerAddress || "N/A"}</td>
                  <td className="px-6 py-4">{shop.ownerNumber || "N/A"}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/vendor-details/${shop._id}`, {
                          state: shop,
                        })
                      }
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(shop.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(shop._id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={isDeleting}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-400 py-8">
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
