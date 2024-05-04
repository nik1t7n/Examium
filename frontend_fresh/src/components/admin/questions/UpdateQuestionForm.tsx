import React, { useState } from "react";
import { useAuth } from "../../../auth/AuthContext";
import QuestionService, {
} from "../../../services/QuestionService";
import ErrorMessage from "../../state/ErrorMessage";
import SuccessMessage from "../../state/SuccessMessage";
import { useMessageHandler } from "../../../utils/MessageHandler";
import { QuestionDto } from "../../../data/DTOs/QuestionDto";

const UpdateQuestionForm: React.FC = () => {
  const { token } = useAuth(); // store jwt token here

  const [questionId, setQuestionId] = useState<number>(0); // question id to find specific question
  const [updatedQuestion, setUpdatedQuestion] = useState<QuestionDto>({ // object to update the question
    category: "",
    questionNumber: 0,
    questionText: "",
  });

  const { message, showMessage } = useMessageHandler();

  // Function to handle updating the question
  const handleUpdateQuestion = async () => {
    // if admin is logged in
    if (token) {
      try {
        // update question
        await QuestionService.updateQuestion(
          questionId,
          updatedQuestion,
          token
        );
        // reset questionId and updatedQuestion state
        setQuestionId(0);
        setUpdatedQuestion({
          category: "",
          questionNumber: 0,
          questionText: "",
        });
        showMessage("success", "Question updated successfully!");
      } catch (error) {
        console.error("Error updating question:", error);
        showMessage(
          "error",
          `${error}`
        );
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Update Question</h2>
      <div className="form-group">
        <label htmlFor="questionId" className="block font-medium mb-2">
          Question ID
        </label>
        <input
          type="number"
          id="questionId"
          className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2 mb-2"
          value={questionId}
          onChange={(e) => setQuestionId(Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="form-group">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={updatedQuestion.category}
            onChange={(e) =>
              setUpdatedQuestion({
                ...updatedQuestion,
                category: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="questionNumber" className="block font-medium mb-2">
            Question Number
          </label>
          <input
            type="number"
            id="questionNumber"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full p-2"
            value={updatedQuestion.questionNumber}
            onChange={(e) =>
              setUpdatedQuestion({
                ...updatedQuestion,
                questionNumber: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="form-group col-span-1 sm:col-span-2">
          <label htmlFor="questionText" className="block font-medium mb-2">
            Question Text
          </label>
          <textarea
            id="questionText"
            className="border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 w-full"
            value={updatedQuestion.questionText}
            onChange={(e) =>
              setUpdatedQuestion({
                ...updatedQuestion,
                questionText: e.target.value,
              })
            }
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleUpdateQuestion}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Question
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

export default UpdateQuestionForm;
