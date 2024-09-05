import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import Spinner from "../components/Spinner";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", user);
      setUsers([...users, response.data]);
    } catch (error) {
      setError("Failed to create user.");
    }
  };

  const updateUser = async (user) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
      setUsers(users.map((u) => (u.id === user.id ? response.data : u)));
      setSelectedUser(null);
    } catch (error) {
      setError("Failed to update user.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      setError("Failed to delete user.");
    }
  };

  const editUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto  text-white">
      <h1 className="text-3xl font-bold text-center my-4">User Management</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        < div className="flex items-center justify-center h-screen"> <Spinner /> </div>
      ) : (
        <>
          <UserForm onSubmit={selectedUser ? updateUser : createUser} user={selectedUser} />
          <UserList users={users} onEdit={editUser} onDelete={deleteUser} />
        </>
      )
      }
    </div >
  );
};

export default Home;
