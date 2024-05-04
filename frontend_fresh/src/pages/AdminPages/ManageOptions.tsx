import React, { useState } from "react";
import AddOptionForm from "../../components/admin/options/AddOptionForm";

import { CheckToken } from "../../utils/CheckToken";
import { useAuth } from "../../auth/AuthContext";
import DeleteOptionForm from "../../components/admin/options/DeleteOptionForm";
import UpdateOptionForm from "../../components/admin/options/UpdateOptionForm";
import GetAllOptionsForm from "../../components/admin/options/GetAllOptionsForm";
import GetAllOptionsFromQuestionsForm from "../../components/admin/options/GetAllOptionsFromQuestionsForm";

const ManageOptions: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const loading = CheckToken();
  const { token } = useAuth();

  if (loading) {
    return <div>Loading... (or you just not an admin ^_^)</div>;
  }

  return (
    <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Manage Options</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelectedAction("add")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Option
        </button>
        <button
          onClick={() => setSelectedAction("delete")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Option
        </button>
        <button
          onClick={() => setSelectedAction("update")}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Option
        </button>
        <button
          onClick={() => setSelectedAction("getAll")}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Get All Options
        </button>
        <button
          onClick={() => setSelectedAction("getAllFromQuestions")}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Get All Options From Questions
        </button>
      </div>
      {selectedAction === "add" && <AddOptionForm />}
      {selectedAction === "delete" && <DeleteOptionForm />}
      {selectedAction === "update" && <UpdateOptionForm />}
      {selectedAction === "getAll" && <GetAllOptionsForm />}
      {selectedAction === "getAllFromQuestions" && <GetAllOptionsFromQuestionsForm />}
    </div>
  );
};

export default ManageOptions;
