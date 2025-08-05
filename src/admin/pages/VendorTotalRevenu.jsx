import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const transactions = [
  {
    user: 'Sarang',
    deliveryBoy: 'Kunal Bhal',
    foodCategory: 'veg',
    orderDate: '12/02/2025',
    amount: '+200',
    paymentMethod: "UPI",
    status: "completed",
  },
  {
    user: 'Sarang',
    deliveryBoy: 'Kunal Bhal',
    foodCategory: 'veg',
    orderDate: '12/02/2025',
    amount: '+200',
    paymentMethod: "UPI",
    status: "completed",
  },
  {
    user: 'Sarang',
    deliveryBoy: 'Kunal Bhal',
    foodCategory: 'veg',
    orderDate: '12/02/2025',
    amount: '+200',
    paymentMethod: "UPI",
    status: "completed",
  },
];

const VendorTotalRevenue = () => {
  return (
    <div className="bg-[#D9D9D9] rounded-xl">
      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden h-[350px]">
        <div className="grid grid-cols-7 font-semibold text-lg border-b px-6 py-4 bg-gray-50 text-center">
          <div>User</div>
          <div>Delivery Boy</div>
          <div>Food Category</div>
          <div>Order Date</div>
          <div>Amount</div>
          <div>Payment Method</div>
          <div>Action</div>
        </div>

        {transactions.map((tx, idx) => (
          <div
            key={idx}
            className="grid grid-cols-7 py-4 text-gray-700 border-b items-center text-base text-center"
          >
            <div>{tx.user}</div>
            <div>{tx.deliveryBoy}</div>
            <div className="text-gray-500">{tx.foodCategory}</div>
            <div className="text-green-600 font-medium">{tx.orderDate}</div>
            <div className="text-gray-800">{tx.amount}</div>
            <div className="text-gray-500">{tx.paymentMethod}</div>
            <div>
              <button className="text-red-500 hover:text-red-700">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorTotalRevenue;
