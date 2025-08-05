import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery, useDeleteUserMutation } from "../redux/apis/Userapis";

const UserManagement = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, refetch } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: isDeleting, isError: isDeleteError }] = useDeleteUserMutation();

  const handleRowClick = (user) => {
    navigate(`/admin/user-details/${user._id}`);
  };

  const handleDelete = async (e, userId) => {
    e.stopPropagation(); // Prevent row click

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser({ id: userId }).unwrap();
      alert("User deleted successfully.");
      refetch(); // Refresh the list
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete the user. Please try again.");
    }
  };

  return (
    <div className="font-josefin border-t pt-20 px-4">
      {/* Responsive Card View for < lg */}
      <div className="lg:hidden space-y-4">
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
        {isError && <p className="text-center text-red-500">Failed to load users.</p>}
        {isDeleteError && <p className="text-center text-red-500">Failed to delete user.</p>}

        {users?.map((user, idx) => (
          <div
            key={idx}
            onClick={() => handleRowClick(user)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
          >
            <p><span className="font-semibold">Name:</span> {user.Name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Contact No:</span> {user.contactNo}</p>
            <p><span className="font-semibold">Registered:</span> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
            <button
              onClick={(e) => handleDelete(e, user._id)}
              className="text-red-600 hover:text-red-800 mt-2"
              disabled={isDeleting}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Default Table View for lg and up */}
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white h-[600px]">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-center text-xl font-Normal text-[#000000B5] border-b">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Contact No</th>
              <th className="px-6 py-4">Registration Date</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-red-500">
                  Failed to load users.
                </td>
              </tr>
            )}

            {users &&
              users.map((user, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleRowClick(user)}
                  className="cursor-pointer text-center text-[#B8B8B8] hover:bg-gray-50 border-b"
                >
                  <td className="px-6 py-4">{user.Name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.contactNo}</td>
                  <td className="px-6 py-4">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={(e) => handleDelete(e, user._id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={isDeleting}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}

            {isDeleteError && (
              <tr>
                <td colSpan="5" className="text-center text-red-500 py-4">
                  Failed to delete user.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
