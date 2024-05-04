import React, { useState, useEffect } from "react";
import { useAuth } from "../../../auth/AuthContext";
import OptionService from "../../../services/OptionService";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import QuestionService from "../../../services/QuestionService";
import { OptionDto } from "../../../data/DTOs/OptionDto";
import { Question } from "../../../data/Models/Question";

const AddOptionForm: React.FC = () => {
    // State variables to hold the new option, questions, and message
  const { token } = useAuth();
  const [newOption, setNewOption] = useState<OptionDto>({
    text: "",
    isCorrect: false,
    questionId: 0,
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const { message, showMessage } = useMessageHandler();

  // Function to load all questions
  const loadQuestions = async () => {
    try {
      const fetchedQuestions = await QuestionService.getAllQuestions();
      // Update the questions state with the fetched questions
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Load all questions when the component mounts
  useEffect(() => {
    loadQuestions();
  }, []);

  // Function to handle changes in input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Convert string "true" to boolean true for isCorrect field, leave other values unchanged
    const newValue = name === "isCorrect" ? value === "true" : value;
    // Update the newOption state with the changed field
    setNewOption((prevState) => ({ ...prevState, [name]: newValue }));
  }; // all these convertions are made to prevent BadRequest Error

  // Function to handle adding a new option
  const handleAddOption = async () => {
    if (token) {
      try {
        await OptionService.addOption(newOption, token);
        // Reset the newOption state after successful addition
        setNewOption({ text: "", isCorrect: false, questionId: 0 });
        showMessage("success", "Option added successfully!");
      } catch (error: any) {
        console.error("Error adding option:", error);
        showMessage("error", `${error}`);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Add New Option</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="text" className="block font-medium mb-2">
            Option Text
          </label>
          <input
            type="text"
            id="text"
            name="text"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newOption.text}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="isCorrect" className="block font-medium mb-2">
            Is Correct?
          </label>
          <select
            id="isCorrect"
            name="isCorrect"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newOption.isCorrect.toString()}
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="questionId" className="block font-medium mb-2">
            Select Question
          </label>
          <select
            id="questionId"
            name="questionId"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={newOption.questionId}
            onChange={handleChange}
          >
            <option value="0">Select a question...</option>
            {questions.map((question) => (
              <option key={question.id} value={question.id}>
                {question.questionText}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAddOption}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Option
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

export default AddOptionForm;
