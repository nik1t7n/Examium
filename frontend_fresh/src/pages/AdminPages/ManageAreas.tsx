import React, { useState } from "react";
import { CheckToken } from "../../utils/CheckToken";
import { useAuth } from "../../auth/AuthContext";
import DeleteAreaForm from "../../components/admin/areas/DeleteAreaForm";
import UpdateAreaForm from "../../components/admin/areas/UpdateAreaForm";
import GetAllAreasForm from "../../components/admin/areas/GetAllAreasForm";
import GetAreaByIdForm from "../../components/admin/areas/GetAreaByIdForm";
import AddAreaForm from "../../components/admin/areas/AddAreaForm";

const ManageAreas: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const loading = CheckToken();
  const { token } = useAuth();

  if (loading) {
    return <div>Loading... (or you just not an admin ^_^)</div>;
  }

  return (
    <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Manage Areas</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelectedAction("add")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Area
        </button>
        <button
          onClick={() => setSelectedAction("delete")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Area
        </button>
        <button
          onClick={() => setSelectedAction("update")}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Area
        </button>
        <button
          onClick={() => setSelectedAction("getAll")}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Get All Areas
        </button>
        <button
          onClick={() => setSelectedAction("getAreaById")}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Area By Id
        </button>
      </div>
      {selectedAction === "add" && <AddAreaForm />}
      {selectedAction === "delete" && <DeleteAreaForm />}
      {selectedAction === "update" && <UpdateAreaForm />}
      {selectedAction === "getAll" && <GetAllAreasForm />}
      {selectedAction === "getAreaById" && <GetAreaByIdForm />}
    </div>
  );
};

export default ManageAreas;
