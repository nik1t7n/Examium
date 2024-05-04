import React, { useState, useEffect, useCallback } from "react";
import QuizCard from "../../info/QuizCard";
import { useAuth } from "../../../auth/AuthContext";
import QuestionService from "../../../services/QuestionService";
import OptionService, {
} from "../../../services/OptionService";
import { OptionConvenient } from "../../../data/DTOs/OptionConvenient";
import { Question } from "../../../data/Models/Question";

const GetAllQuestionsForm: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionOptions, setQuestionOptions] = useState<{ // storing options related to each question by question ID
    [key: number]: OptionConvenient[]; // OptionConveniet consists only of Text and IsCorrect
  }>({});
  const [loading, setLoading] = useState(true); // tracking loading state while fetching data
  const [error, setError] = useState<string | null>(null); 
  const { token } = useAuth();

  // function to fetch all questions
  const fetchQuestions = useCallback(async () => { // we use useCallback for memoization
    try {
      const data = await QuestionService.getAllQuestions();
      setQuestions(data);
    } catch (error) {
      setError("Error fetching questions. Please try again later.");
    }
  }, [token]); // function will be recalled only if token changes

  // function to fetch options for each question
  const fetchOptions = useCallback(async () => {
    try {
      if (questions.length > 0) {
        // Map through questions and fetch options for each question using OptionService
        const optionsPromises = questions.map(async (question) => {
          const options = await OptionService.getAllOptionsFromQuestions(
            question.id,
          );
          return { questionId: question.id, options };
        });
        // Wait for all options fetching promises to resolve
        const optionsResults = await Promise.all(optionsPromises);
        // Map options results to question ID and set state
        const optionsMap: { [key: number]: OptionConvenient[] } = {};
        optionsResults.forEach((result) => {
          optionsMap[result.questionId] = result.options;
        });
        setQuestionOptions(optionsMap);
        setLoading(false);
      }
    } catch (error) {
      setError("Error fetching options. Please try again later.");
    }
  }, [token, questions]);

  // Effect hook to fetch questions when component mounts
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Effect hook to fetch options when questions or token change
  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className="max-w-4xl mx-auto py-4 px-6 overflow-y-scroll drop-shadow-md border border-indigo-500 rounded-md"
      style={{ maxHeight: "80vh" }}
    >
      <h2 className="text-xl font-bold mb-4">All Questions</h2>
      <div className="grid gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          questions.map((question) => (
            <QuizCard
              key={question.id}
              category={question.category}
              questionNumber={question.questionNumber}
              questionsAmount={questions.length}
              questionText={question.questionText}
              options={questionOptions[question.id] || []}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GetAllQuestionsForm;
