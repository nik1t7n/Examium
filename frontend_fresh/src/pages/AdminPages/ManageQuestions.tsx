import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddQuestionForm from "../../components/admin/questions/AddQuestionForm";
import DeleteQuestionForm from "../../components/admin/questions/DeleteQuestionForm";
import UpdateQuestionForm from "../../components/admin/questions/UpdateQuestionForm";
import GetQuestionByIdForm from "../../components/admin/questions/GetQuestionByIdForm";
import { CheckToken } from "../../utils/CheckToken";
import { useAuth } from "../../auth/AuthContext";
import GetAllQuestionsForm from "../../components/admin/questions/GetAllQuestionsForm";

const ManageQuestions: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const loading = CheckToken();
  const { token } = useAuth();

  if (loading) {
    return <div>Loading... (or you just not an admin ^_^)</div>;
  }

  return (
    <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Manage Questions</h1>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelectedAction("add")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Question
        </button>
        <button
          onClick={() => setSelectedAction("delete")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Question
        </button>
        <button
          onClick={() => setSelectedAction("update")}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Question
        </button>
        <button
          onClick={() => setSelectedAction("getById")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Question By Id
        </button>
        {/* Добавляем кнопку для GetAllQuestions */}
        <button
          onClick={() => setSelectedAction("getAll")}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Get All Questions
        </button>
      </div>
      {selectedAction === "add" && <AddQuestionForm />}
      {selectedAction === "delete" && <DeleteQuestionForm />}
      {selectedAction === "update" && <UpdateQuestionForm />}
      {selectedAction === "getById" && <GetQuestionByIdForm />}
      {selectedAction === "getAll" && <GetAllQuestionsForm />} 
    </div>
  );
};

export default ManageQuestions;
