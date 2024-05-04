import React, { useState, useEffect } from "react";
import OptionService from "../../../services/OptionService";
import OptionCard from "../../info/OptionCard";
import QuestionService from "../../../services/QuestionService";
import { Option } from "../../../data/Models/Option";
import { Question } from "../../../data/Models/Question";

const GetAllOptionsFromQuestionsForm: React.FC = () => {
  // State variables to hold the selected question ID, options, loading state, and questions list
  const [questionId, setQuestionId] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Function to handle changes in the question selection dropdown
  const handleQuestionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Update the selected question ID state based on the value of the dropdown
    setQuestionId(parseInt(e.target.value));
  };

  // Function to load options based on the selected question ID
  const loadOptions = async (questionId: number) => {
    setLoading(true);
    try {
      const fetchedOptions = await OptionService.getAllOptionsFromQuestions(
        questionId
      );
      setOptions(fetchedOptions);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
    setLoading(false);
  };

  // Function to load all questions
  const loadQuestions = async () => {
    try {
      const fetchedQuestions = await QuestionService.getAllQuestions();
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  // Load all questions when the component mounts
  useEffect(() => {
    loadQuestions();
  }, []);

  // Load options whenever the selected question ID changes
  useEffect(() => {
    if (questionId !== 0) {
      loadOptions(questionId);
    }
  }, [questionId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Options from Question</h2>
      <div className="mb-4">
        <label htmlFor="questionSelect" className="block font-medium mb-2">
          Select Question:
        </label>
        <select
          id="questionSelect"
          name="questionSelect"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
          onChange={handleQuestionChange}
        >
          <option value="0">Select a question...</option>
          {questions.map((question) => (
            <option key={question.id} value={question.id}>
              {question.questionText}
            </option>
          ))}
        </select>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          options.map((option, index) => (
            <OptionCard key={index} option={option} />
          ))
        )}
      </div>
    </div>
  );
};

export default GetAllOptionsFromQuestionsForm;
