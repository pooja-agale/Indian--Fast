import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useGetAllBannerQuery,
  useDeleteBannerMutation,
} from "../redux/apis/Bannerapi";

const AddBanner = () => {
  const navigate = useNavigate();

  const {
    data: banners,
    isLoading,
    isError,
    refetch, // ✅ to force refresh
  } = useGetAllBannerQuery();

  const [deleteBanner] = useDeleteBannerMutation();

  // ✅ Automatically refetch banners on component mount
  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      try {
        await deleteBanner(id).unwrap();
        alert("Banner deleted successfully");
        refetch(); // ✅ Refresh after deletion
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete banner");
      }
    }
  };

  return (
    <div className=" relative  pt-20 px-4">
      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          onClick={() => navigate("/admin/add-banner-form")}
        >
          +Add Banner
        </button>
      </div>

      {/* Banner Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 bg-white h-[540px] p-8 rounded-xl">
        {banners?.data?.map((banner) => (
          <div key={banner._id} className="relative flex flex-col items-center">
            <img
              src={banner.image}
              alt="Banner"
              className="object-cover rounded-lg"
            />
            <button
              className="mt-4 text-red-500 hover:text-red-700 transition text-xl"
              onClick={() => handleDelete(banner._id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBanner;
