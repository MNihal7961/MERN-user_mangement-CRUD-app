import React, { useEffect, useState } from "react";
import avatar from "../assets/nopic.png";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import EditUserModal from "../components/EditUserModal";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/allusers`)
      .then((response) => {
        const fetchedUsers = response.data.users;
        setUsers(fetchedUsers);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [users]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/user/deleteaccount/${id}`);
      const data = res.data;
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user._id !== id));
      setShowConfirmation(false);
    } catch (err) {
      toast.error(err);
    }
  };

  const openConfirmation = (id) => {
    setUserIdToDelete(id);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const openEditModal = (userData) => {
    setEditUserData(userData);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditUserData(null);
  };

  return (
    <section>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : users && users.length > 0 ? (
        <div className="overflow-x-auto sm:rounded-lg p-5 m-5">
          <section>
            <div className="container text-center">
              <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                <input
                  type="search"
                  className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
                  placeholder="Search User"
                  value={search}
                  onChange={handleSearchChange}
                />
                <button className="btn mt-0 rounded-[0px] rounded-r-md">
                  Search
                </button>
              </div>
            </div>
          </section>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b hover:border-b-2 hover:border-primaryColor"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.photo ? user.photo : avatar}
                      alt="User image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold text-primaryColor">
                        {user.name}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openConfirmation(user._id)}
                      className="bg-white font-semibold  p-2 rounded-md text-red-600 border border-red-600 hover:text-white hover:bg-red-600 text-center "
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openEditModal(user)}
                      className="bg-white font-semibold  p-2 rounded-md text-blue-600 border border-blue-600 hover:text-white hover:bg-blue-600"
                    >
                      <MdEdit />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full mb-64">
          <h1 className="text-red-600 text-[25px] leading-[30px] font-semibold ">
            No Users Found
          </h1>
        </div>
      )}
      {showEditModal && (
        <EditUserModal userData={editUserData} handleClose={closeEditModal} />
      )}
      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <FaTrash
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete User
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this user?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  onClick={() => handleDelete(userIdToDelete)}
                  type="button"
                  className="inline-flex justify-center w-full border border-transparent rounded-md shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={closeConfirmation}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AllUsers;
