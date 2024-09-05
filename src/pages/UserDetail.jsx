// src/pages/UserDetailPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserDetailPage = () => {
  const { id } = useParams(); // Get the user ID from the route parameters
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
    } catch (error) {
      setError("Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="text-gray-500">User not found.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-zinc-800 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">{user.name}'s Details</h2>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Phone:</strong> {user.phone}</p>
      <p className="mb-2"><strong>Website:</strong> {user.website}</p>
      <p className="mb-4"><strong>Company:</strong> {user.company.name}</p>
      <p className="mb-4"><strong>Address:</strong> {`${user.address.street}, ${user.address.city}`}</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
      >
        Back
      </button>
    </div>
  );
};

export default UserDetailPage;
