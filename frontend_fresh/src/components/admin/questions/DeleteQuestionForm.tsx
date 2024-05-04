import React, { useState, useEffect, ChangeEvent } from "react";
import { useAuth } from "../../../auth/AuthContext";
import QuestionService from "../../../services/QuestionService";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import { Question } from "../../../data/Models/Question";

const DeleteQuestionForm: React.FC = () => {
  const { token } = useAuth();
  const [deleteOption, setDeleteOption] = useState<string>(""); // State for delete variant
  const [questionId, setQuestionId] = useState<number | string>(""); // State for question ID to delete
  const [questionOptions, setQuestionOptions] = useState<Question[]>([]); // State for existing questions to choose one of them
  const { message, showMessage } = useMessageHandler();

  // useEffect to fetch all questions
  useEffect(() => {
    if (token) {
      // if admin is logged in
      const fetchQuestions = async () => {
        try {
          const data = await QuestionService.getAllQuestions();
          setQuestionOptions(data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      };
      fetchQuestions();
    }
  }, [token]);

  // Function to handle question deletion
  const handleDeleteQuestion = async () => {
    if (token) {
      try {
        await QuestionService.deleteQuestion(Number(questionId), token);
        setQuestionId("");
        showMessage("success", "Question deleted successfully!");
      } catch (error) {
        console.error("Error deleting question:", error);
        showMessage("error", `${error}`);
      }
    }
  };

  // Function to handle select change
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // Update delete variant state
    setDeleteOption(e.target.value);
    // Reset question ID state
    setQuestionId("");
  };

  // Function to handle question ID change
  const handleQuestionIdChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    // Update question ID state
    setQuestionId(e.target.value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Delete Question</h2>
      <div className="form-group">
        <label htmlFor="deleteOption" className="block font-medium mb-2">
          Delete Option
        </label>
        <select
          id="deleteOption"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2 mb-2"
          value={deleteOption}
          onChange={handleSelectChange}
        >
          <option value="">Select Delete Option</option>
          <option value="id">Delete by ID</option>
          <option value="existing">Choose from Existing Questions</option>
        </select>
      </div>
      {deleteOption === "id" && (
        <div className="form-group">
          <label htmlFor="questionId" className="block font-medium mb-2">
            Question ID
          </label>
          <input
            type="number"
            id="questionId"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={questionId}
            onChange={handleQuestionIdChange}
          />
        </div>
      )}
      {deleteOption === "existing" && (
        <div className="form-group">
          <label htmlFor="existingQuestion" className="block font-medium mb-2">
            Select Question to Delete
          </label>
          <select
            id="existingQuestion"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={questionId}
            onChange={handleQuestionIdChange}
          >
            <option value="">Select Question</option>
            {questionOptions.map((question) => (
              <option key={question.id} value={question.id}>
                (ID:{question.id}) {question.questionText}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDeleteQuestion}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={!questionId}
        >
          Delete Question
        </button>
      </div>
      <div className="mt-3">
        {message &&
          (message.type === "error" ? (
            <ErrorMessage message={message.text} />
          ) : (
            <SuccessMessage message={message.text} />
          ))}
      </div>
    </div>
  );
};

export default DeleteQuestionForm;
