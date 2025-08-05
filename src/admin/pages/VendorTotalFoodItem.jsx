import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useGetAllCategoriesQuery } from "../redux/apis/Categoriesapi";

const VendorTotalFoodItem = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Failed to load categories</p>;

  // Find the selected category's products
  const selectedCategory = categories.find(
    (cat) => cat._id === selectedCategoryId
  );
  const items = selectedCategory?.products || [];

  return (
    <div className="bg-[#D9D9D9] flex [min-h-full]">
      {/* Sidebar - Category list */}
      {/* Sidebar - Category list */}
      <div className="w-52 bg-[#FF9F03] text-white flex flex-col pt-4 h-[350px] overflow-y-auto">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategoryId(cat._id)}
            className={`text-left px-4 py-3 font-medium text-lg hover:bg-orange-500 transition ${
              selectedCategoryId === cat._id ? "bg-orange-500" : ""
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Food Items Grid */}
      <div className="bg-white grid grid-cols-4 gap-x-8 gap-y-8 pt-4 flex-1">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="flex rounded-lg p-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-md"
              />
              <div className="pl-4">
                <div className="mt-2 text-md font-semibold">{item.name}</div>
                <div className="text-gray-500">₹{item.price}</div>
                <button className="mt-2 text-red-500 hover:text-red-700 text-xl">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorTotalFoodItem;
