import React, { useState } from "react";
import { useAddCategoriesMutation } from "../redux/apis/Categoriesapi";
import { MdOutlineFileUpload } from "react-icons/md";

const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [addCategory, { isLoading }] = useAddCategoriesMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return alert("Please enter a category name.");
    if (!categoryImage) return alert("Please upload a category image.");

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);

    try {
      await addCategory(formData).unwrap();
      alert("✅ Category added successfully!");
      setCategoryName("");
      setCategoryImage(null);
      setPreviewImage(null);
      setShowModal(false);
    } catch (err) {
      console.error("Error adding category:", err);
      alert(err?.data?.message || "❌ Failed to add category. Please try again.");
    }
  };

  return (
    <div className="px-6 pt-16 font-josefin w-full max-w-5xl mx-auto">
      

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4 text-black">Add Category</h2>

            <form onSubmit={handleSubmit}>
              <label className="block text-md mb-1">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Name"
                className="w-full bg-gray-100 px-4 py-3 rounded-md mb-4 focus:outline-none"
              />

              <label className="block text-md mb-1">Category Image</label>
              <div className="w-full h-40 bg-gray-100 rounded-md mb-4 flex flex-col items-center justify-center text-gray-500 relative overflow-hidden">
                <label
                  htmlFor="categoryImage"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer z-10"
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="object-cover w-full h-full rounded-md"
                    />
                  ) : (
                    <MdOutlineFileUpload size={30} />
                  )}
                </label>
                <input
                  id="categoryImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-medium transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategoryForm;
