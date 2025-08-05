import React from "react";
import { FaUsers, FaMoneyBill } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../redux/apis/Userapis";


const DashboardCards = () => {
  const navigate = useNavigate();

  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery();

  
  const vendorCount = 12; 
  const transactionCount = 48; 

  const dashboardStats = [
    {
      id: 1,
      label: "Total Users",
      value: usersLoading ? "Loading..." : usersData?.length || 0,
      icon: <FaUsers />,
      route: "/admin/manage-users",
    },
    {
      id: 2,
      label: "Total Vendors",
      value: vendorCount,
      icon: <GiForkKnifeSpoon />,
      route: "/admin/vendor",
    },
    {
      id: 3,
      label: "Transactions",
      value: transactionCount,
      icon: <FaMoneyBill />,
      route: "/admin/transactions",
    },
  ];

  return (
    <div className="min-h-screen  font-poppins font-normal pt-20 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardStats.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.route)}
            className="flex items-center justify-between p-5 border rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-white cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="border border-orange-400 rounded-[100%]">
                <div className="p-3 m-4 bg-blue-50 text-yellow-500 rounded-full border border-blue-200 text-xl">
                  {item.icon}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-normal text-gray-700">{item.value}</h2>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
