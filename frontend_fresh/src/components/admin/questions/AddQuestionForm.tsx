import React, { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import QuestionService from "../../../services/QuestionService";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import { QuestionDto } from "../../../data/DTOs/QuestionDto";

const AddQuestionForm: React.FC = () => {
  const { token } = useAuth();
  const [newQuestion, setNewQuestion] = useState<QuestionDto>({ // State for new question
    category: "",
    questionNumber: 0,
    questionText: "",
  });
  const { message, showMessage } = useMessageHandler();

  // Function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Update new question state with the changed value
    setNewQuestion(prevState => ({ ...prevState, [name]: value }));
  };

  // Function to handle adding a new question
  const handleAddQuestion = async () => {
    if (token) { // if admin is logged in
      try {
        await QuestionService.addQuestion(newQuestion, token);
        setNewQuestion({ category: "", questionNumber: 0, questionText: "" }); // Reset new question state
        showMessage("success", "Question added successfully!");
      } catch (error: any) {
        console.error("Error adding question:", error);
        showMessage("error", `${error}`);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newQuestion.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="questionNumber" className="block font-medium mb-2">
            Question Number
          </label>
          <input
            type="number"
            id="questionNumber"
            name="questionNumber"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newQuestion.questionNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-span-1 sm:col-span-2">
          <label htmlFor="questionText" className="block font-medium mb-2">
            Question Text
          </label>
          <textarea
            id="questionText"
            name="questionText"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full"
            value={newQuestion.questionText}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Question
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

export default AddQuestionForm;
