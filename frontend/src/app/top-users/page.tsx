'use client';

import { useEffect, useState } from "react";

// Define an interface for the user object
interface User {
  user_name: string;
  post_count: number;
}

export default function TopUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/users/")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Plese replace the access_token');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 font-medium">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Top 5 Active Users
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-lg p-5 flex items-center space-x-4 border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`}
                alt={`${user.user_name}'s profile`}
                className="w-12 h-12 rounded-full object-cover border border-gray-300"
              />
              <div className="flex-1">
                <h2 className="text-lg font-medium text-gray-900">
                  {user.user_name}
                </h2>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{user.post_count}</span> Posts
                </p>
              </div>
            </div>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}