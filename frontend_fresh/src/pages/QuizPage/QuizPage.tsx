import React, { useState, useEffect, useCallback } from 'react';
import SuccessMessage from '../../components/state/SuccessMessage';
import QuizCard from '../../components/info/QuizCard';
import CustomButton from '../../components/CustomButton';
import ThemeToggler from '../../components/ThemeToggler';
import QuestionService from '../../services/QuestionService';
import OptionService from '../../services/OptionService';
import { useAuth } from '../../auth/AuthContext';
import { OptionConvenient } from '../../data/DTOs/OptionConvenient';
import { Question } from '../../data/Models/Question';

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionOptions, setQuestionOptions] = useState<{
    [key: number]: OptionConvenient[];
  }>({});
  const [loading, setLoading] = useState(true);
  const [optionsLoading, setOptionsLoading] = useState(false); // Состояние для отслеживания загрузки опций
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const fetchQuestions = useCallback(async () => {
    try {
      const data = await QuestionService.getAllQuestions();
      setQuestions(data);
    } catch (error) {
      setError("Error fetching questions. Please try again later.");
    }
  }, [token]);

  const fetchOptionsForQuestion = useCallback(async (questionId: number) => {
    try {
      const options = await OptionService.getAllOptionsFromQuestions(questionId);
      setQuestionOptions(prevOptions => ({
        ...prevOptions,
        [questionId]: options
      }));
    } catch (error) {
      setError("Error fetching options. Please try again later.");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchQuestions();
    };
    fetchData();
  }, [fetchQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      const fetchData = async () => {
        await fetchOptionsForQuestion(questions[currentQuestion].id);
        setLoading(false);
      };
      fetchData();
    }
  }, [fetchOptionsForQuestion, questions, currentQuestion]);

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      if (!optionsLoading) { // Проверяем, не происходит ли уже загрузка опций
        setOptionsLoading(true); // Устанавливаем состояние загрузки опций в true
        await fetchOptionsForQuestion(questions[currentQuestion + 1].id);
        setOptionsLoading(false); // Устанавливаем состояние загрузки опций обратно в false после загрузки
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
      }
    } else {
      setShowSuccessMessage(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setShowSuccessMessage(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex justify-center items-center flex-col px-4 relative">
      <div className="absolute top-0 right-0 m-4">
        <ThemeToggler />
      </div>
      {showSuccessMessage ? (
        <SuccessMessage message="Congratulations! You've completed the quiz." />
      ) : (
        <>
          <div className="mb-8 relative w-full max-w-lg">
            <div className="">
              {questions.length > 0 && !loading && (
                <QuizCard options={questionOptions[questions[currentQuestion].id] || []} {...questions[currentQuestion]} questionsAmount={questions.length} />
              )}
            </div>
          </div>
          <div className="flex justify-center w-full">
            <CustomButton text="Next Question" onClick={handleNextQuestion} />
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;
