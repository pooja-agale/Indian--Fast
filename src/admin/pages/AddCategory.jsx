import React, { useState, useEffect } from "react";
import {
  useAddCategoriesMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../redux/apis/Categoriesapi";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [addCategory, { isLoading }] = useAddCategoriesMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const {
    data,
    isLoading: isFetching,
    isError,
    refetch,
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (categoryImage && typeof categoryImage !== "string") {
      setPreviewImage(URL.createObjectURL(categoryImage));
    } else if (typeof categoryImage === "string") {
      setPreviewImage(categoryImage);
    }
  }, [categoryImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return alert("Please enter a category name.");
    if (!categoryImage && !isEditing) return alert("Please upload a category image.");

    const formData = new FormData();
    formData.append("name", categoryName);
    if (categoryImage && typeof categoryImage !== "string") {
      formData.append("image", categoryImage);
    }

    try {
      if (isEditing && editId) {
        await updateCategory({ id: editId, formData }).unwrap();
        alert("✅ Category updated successfully!");
      } else {
        await addCategory(formData).unwrap();
        alert("✅ Category added successfully!");
      }

      setCategoryName("");
      setCategoryImage(null);
      setPreviewImage(null);
      setShowModal(false);
      setIsEditing(false);
      setEditId(null);
      refetch();
    } catch (err) {
      console.error("Error saving category:", err);
      alert(err?.data?.message || "❌ Failed to save category.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        alert("🗑️ Category deleted!");
        refetch();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("❌ Delete failed.");
      }
    }
  };

  const handleEdit = (cat) => {
    setCategoryName(cat.name);
    setCategoryImage(cat.image);
    setPreviewImage(cat.image);
    setEditId(cat._id);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 pt-16 font-josefin w-full max-w-5xl mx-auto">
      {/* Add/Edit Category Button */}
      <div className="flex justify-end m-4 sm:m-6">
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setCategoryName("");
            setCategoryImage(null);
            setPreviewImage(null);
          }}
          className="bg-green-600 text-white px-4 py-2 md:px-5 md:py-3 rounded-xl text-sm sm:text-base md:text-lg"
        >
          Add Category
        </button>
      </div>

      {/* Display Categories */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
          Existing Categories
        </h2>

        {isFetching ? (
          <p>Loading categories...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load categories.</p>
        ) : data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {data.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center gap-4 bg-gray-100 p-4 rounded"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-black text-sm sm:text-base md:text-lg">
                    {cat.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(cat)}>
                    <RiEdit2Fill className="text-green-600 text-lg" />
                  </button>
                  <button onClick={() => handleDelete(cat._id)}>
                    <FaTrashAlt className="text-red-500 text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No categories found.</p>
        )}
      </div>

      {/* Modal Popup Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4 md:px-8">
          <div className="bg-white rounded-xl w-full max-w-md p-4 sm:p-6 md:p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-black">
              {isEditing ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="block text-md mb-1">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Name"
                className="w-full bg-gray-100 px-4 py-3 rounded-md mb-4 focus:outline-none text-sm sm:text-base md:text-lg"
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
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-sm sm:text-lg md:text-xl font-medium transition duration-200"
                disabled={isLoading || updating}
              >
                {isEditing
                  ? updating
                    ? "Updating..."
                    : "Update Category"
                  : isLoading
                  ? "Adding..."
                  : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
