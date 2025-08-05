import React from "react";
import { CiTrash } from "react-icons/ci";

const TotalPurchase = ({ type = "completed" }) => {
  return (
    <div className="bg-white h-[340px] p-4 font-josefin rounded-xl overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-gray-700 text-lg border-b border-gray-200">
            <th className="py-2 px-4">Resto Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Food Item</th>
            <th className="py-2 px-4">Order Date</th>
            <th className="py-2 px-4 text-center">Amount</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-400">
          <tr className="hover:bg-gray-50">
            <td className="py-2 text-center">Lemon Tree</td>
            <td className="py-2 text-center">Veg Meal</td>
            <td className="py-2 text-center">Paneer</td>
            <td className="py-2 text-center">12/02/2025</td>
            <td className="py-2 text-center text-green-600">+200</td>
            <td className="py-2 text-center text-green-600">
              {type === "completed" ? "Completed" : "Ongoing"}
            </td>

            <td className="py-2 text-center">
              <button className="text-red-500 hover:text-red-700">
                <CiTrash size={20}/>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TotalPurchase;
