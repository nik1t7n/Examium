import React, { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import QuestionService from "../../../services/QuestionService";
import QuizCard from "../../info/QuizCard";
import ErrorMessage from "../../state/ErrorMessage";
import OptionService from "../../../services/OptionService";
import { useMessageHandler } from "../../../utils/MessageHandler"; 
import SuccessMessage from "../../state/SuccessMessage";
import { OptionConvenient } from "../../../data/DTOs/OptionConvenient";
import { Question } from "../../../data/Models/Question";

const GetQuestionByIdForm: React.FC = () => {
  const { token } = useAuth();
  const { message, showMessage } = useMessageHandler();
  const [questionId, setQuestionId] = useState<number>(0); // storing the question ID input value
  const [options, setOptions] = useState<OptionConvenient[]>(); // storing the options related to the fetched question
  const [question, setQuestion] = useState<Question | null>(null); // storing the fetched question
  const [loading, setLoading] = useState<boolean>(false); // tracking loading state while fetching data

  const handleGetQuestionById = async () => {
    setLoading(true);

    if (token) { // if admin is logged in
      try {
        const result = await QuestionService.getQuestionById(questionId, token); // get the question itself
        const options = await OptionService.getAllOptionsFromQuestions( // get all options for it
          questionId
        );
        // set options and fetched question states
        setOptions(options);
        setQuestion(result);
      } catch (error) {
        console.error("Error getting question by ID:", error);
        showMessage("error", `${error}`);
      } finally {
        // set loading state to false after fetching
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Get Question By ID</h2>
      <div className="form-group">
        <label htmlFor="questionId" className="block font-medium mb-2">
          Question ID
        </label>
        <input
          type="number"
          id="questionId"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
          value={questionId}
          onChange={(e) => setQuestionId(Number(e.target.value))}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleGetQuestionById}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Get Question
        </button>
      </div>
      {loading && <div>Loading...</div>}

      {!loading && question && (
        <div className="mt-4">
          <QuizCard
            category={question.category}
            questionNumber={question.questionNumber}
            questionText={question.questionText}
            options={options || []}
            questionsAmount={question.questionNumber}
          />
        </div>
      )}

      {!loading && (
        <div className="mt-3">
          {message &&
            (message.type === "error" ? (
              <ErrorMessage message={message.text} />
            ) : (
              <SuccessMessage message={message.text} />
            ))}
        </div>
      )}
    </div>
  );
};

export default GetQuestionByIdForm;
