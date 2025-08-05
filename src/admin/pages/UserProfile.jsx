import React, { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutReporter } from "../redux/appSlice"; // adjust the path as needed

const UserProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedEmail, setEditedEmail] = useState("");

  const selector = useSelector((state) => state.auth);
  const userProfile = selector?.user?.user;

  useEffect(() => {
    const storedUser = localStorage.getItem("adminDetails"); // ✅ fixed
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditedEmail(parsedUser.email);
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, email: editedEmail };
    localStorage.setItem("adminDetails", JSON.stringify(updatedUser)); // ✅ fixed
    setUser(updatedUser);
    setEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logoutReporter()); // ✅ clear Redux
    localStorage.removeItem("adminDetails");
    localStorage.removeItem("token");
    navigate("/"); // ✅ redirect
  };

  if (!user) return <p className="text-center">Loading user...</p>;

  return (
    <div className="max-w-sm mx-auto min-h-screen bg-white rounded-3xl shadow-md p-6 font-poppins relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6 mt-2">
        <div className="flex items-center gap-3">
          <div className="w-[50px] h-[50px] p-[2px] rounded-full bg-[#F59E0B]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
              <FaUser size={25} className="text-[#F59E0B]" />
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-md font-semibold text-gray-800 font-poppins">
              {user?.Name || "Admin"}
            </h2>
          </div>
        </div>
        <FiEdit2
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            setEditMode(true);
            setEditedEmail(userProfile?.email || user?.email); // <-- sync latest email
          }}
        />
      </div>

      {/* Profile Info */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="space-y-2">
          <label className="block text-[13px] font-medium text-gray-700 mb-0.5">
            Email
          </label>
          {editMode ? (
            <>
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="w-full bg-gray-200 rounded px-3 py-1 text-[13px]"
              />
              <button
                onClick={handleSave}
                className="text-white text-sm bg-green-600 px-3 py-1 rounded hover:bg-green-700 mt-2"
              >
                Save
              </button>
            </>
          ) : (
            <div>
              <p className="text-[13px] border-b border-gray-300 pb-1 text-gray-800">
                {userProfile?.email || user?.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-[#00AFEF] text-white font-semibold rounded hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
        >
          <IoLogOutOutline className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
