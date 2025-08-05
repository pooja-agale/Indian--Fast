import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useGetAllCategoriesQuery } from "../redux/apis/Categoriesapi";

const Categories = () => {
  const { data: categoryData, isLoading, isError } = useGetAllCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      setSelectedCategory(categoryData[0]);
    }
  }, [categoryData]);

  useEffect(() => {
    if (selectedCategory) {
      setItems(selectedCategory.products || []);
    }
  }, [selectedCategory]);

  return (
    <div className=" pt-20 px-4 flex flex-col lg:flex-row">
      {/* Sidebar for lg screens */}
      <div className="hidden lg:flex w-52 bg-[#FF9F03] text-white flex-col pt-4 overflow-hidden h-[600px]">
        {categoryData &&
          categoryData.map((cat) => (
            <button
              key={cat._id}
              className={`text-left px-4 py-3 font-medium text-lg hover:bg-orange-500 transition ${
                selectedCategory?._id === cat._id
                  ? "bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.name}
            </button>
          ))}
      </div>

      {/* Category scroll bar for smaller screens */}
      <div className="lg:hidden overflow-x-auto whitespace-nowrap bg-[#FF9F03] py-3 px-2 rounded-md mb-4">
        {categoryData &&
          categoryData.map((cat) => (
            <button
              key={cat._id}
              className={`inline-block mx-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                selectedCategory?._id === cat._id
                  ? "bg-green-600 text-white"
                  : "bg-white text-[#FF9F03]"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.name}
            </button>
          ))}
      </div>

      {/* Items Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
  {isLoading ? (
    <p className="text-lg col-span-full text-center">Loading...</p>
  ) : isError ? (
    <p className="text-lg col-span-full text-center text-red-500">
      Failed to load categories
    </p>
  ) : items.length > 0 ? (
    items.map((item) => (
      <div key={item._id} className="flex items-start gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="flex flex-col justify-start">
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-sm text-gray-500">Rs.{item.price}</p>
          <FaTrashAlt className="text-red-500 text-md mt-2 cursor-pointer" />
        </div>
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500 text-lg">
      No items found in "{selectedCategory?.name}"
    </p>
  )}
</div>

    </div>
  );
};

export default Categories;
