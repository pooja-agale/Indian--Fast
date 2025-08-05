import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useAddBannerMutation } from "../redux/apis/Bannerapi";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate

const AddBannerForm = () => {
  const navigate = useNavigate(); // ✅ use navigate
  const [selectedImage, setSelectedImage] = useState(null);
  const [addBanner, { isLoading, isSuccess, isError }] = useAddBannerMutation();

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      await addBanner(formData).unwrap();
      alert("Banner added successfully!");
      setSelectedImage(null);
      navigate("/admin/add-banner"); // ✅ Navigate after success
    } catch (error) {
      console.error("Banner upload failed:", error);
      alert("Failed to upload banner");
    }
  };

  return (
    <div className=" flex items-center justify-center pt-24 px-4">
      <form
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label className="block text-lg font-medium mb-2">Upload Banner</label>

        <label className="relative w-full h-40 flex items-center justify-center rounded-md mb-4 overflow-hidden bg-gray-100 cursor-pointer border border-dashed border-gray-300">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="absolute w-full h-full object-cover z-0"
            />
          ) : (
            <FiUpload className="text-2xl text-gray-500 z-0" />
          )}
        </label>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-medium transition duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Add Banner"}
        </button>

        {isSuccess && (
          <p className="text-green-600 text-sm mt-4">
            Banner uploaded successfully.
          </p>
        )}
        {isError && (
          <p className="text-red-600 text-sm mt-4">Error uploading banner.</p>
        )}
      </form>
    </div>
  );
};

export default AddBannerForm;
