import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserByIdMutation } from "../../Redux/api/userSlice";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserByIdMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState('');
  const [editableUserEmail, setEditableUserEmail] = useState('');

  useEffect(() => {
    refetch();
  }, [refetch]);

  const toggleEdit = (id, name, email) => {
    setEditableUserId(id);
    setEditableUserName(name);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        name: editableUserName,
        email: editableUserEmail
      }).unwrap();
      toast.success("User updated successfully");
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err.data?.message || err.message);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" />
      ) : (
        <div className="overflow-x-auto p-4">
          <table className="w-full min-w-max bg-white shadow-md rounded-lg">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Admin</th>
                <th className="px-6 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b">{user._id}</td>
                  <td className="px-6 py-4 border-b">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button
                          onClick={updateHandler}
                          className="ml-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.name}
                        <button
                          onClick={() => toggleEdit(user._id, user.name, user.email)}
                          className="ml-2 text-blue-500 hover:text-blue-600"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button
                          onClick={updateHandler}
                          className="ml-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.email}
                        <button
                          onClick={() => toggleEdit(user._id, user.name, user.email)}
                          className="ml-2 text-blue-500 hover:text-blue-600"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-6 py-4 border-b">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
