import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { CheckToken } from "../../utils/CheckToken";

const AdminExplore = () => {
  const loading = CheckToken();
  const { token } = useAuth();

  if (loading) {
    return <div>Loading... (or you just not an admin ^_^)</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Welcome to Admin Panel</h1>
      <p className="mb-4">You have successfully logged in as an admin.</p>
      <div className="flex flex-col items-center space-y-4">
        <Link
          to="/managequestions"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Manage Questions
        </Link>
        <Link
          to="/manageareas"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Manage Areas
        </Link>
        <Link
          to="/manageoptions"
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Manage Options
        </Link>
      </div>
    </div>
  );
};

export default AdminExplore;
