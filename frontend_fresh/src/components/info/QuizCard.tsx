import React, { useState, useEffect } from "react";

interface Props {
  category: string;
  questionNumber: number;
  questionsAmount: number;
  questionText: string;
  options: { text: string; isCorrect: boolean }[];
}

const QuizCard: React.FC<Props> = ({
  category,
  questionNumber,
  questionsAmount,
  questionText,
  options,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerSelected, setAnswerSelected] = useState(false);

  // useEffect hook to shuffle options when the question number changes
  useEffect(() => {
    shuffleOptions();
  }, [questionNumber]);

  // Function to shuffle the options array
  const shuffleOptions = () => {
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
    setSelectedOption(null);
    setShuffledOptions(shuffledOptions);
  };

  // State to store the shuffled options
  const [shuffledOptions, setShuffledOptions] = useState(
    [] as { text: string; isCorrect: boolean }[]
  );

  const handleOptionClick = (index: number, isCorrect: boolean) => {
    setSelectedOption(index);
    if (isCorrect) {
      console.log("Correct");
    } else {
      console.log("Error");
    }
  };

  // Tailwindcss classes for different button states
  const correctClass = "bg-green-600  hover:bg-green-700  text-white";
  const incorrectClass = "bg-red-600  hover:bg-red-700  text-white";
  const defaultClass = "bg-blue-600 dark:bg-purple-500 hover:bg-blue-700 dark:hover:bg-purple-600 text-white";

  return (
    <div
      className="max-w-xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden mb-4 dark:border-purple-200 dark:border-2"
      style={{ height: "400px", overflowY: "scroll" }}
    >
      <div className="bg-gray-200 dark:bg-gray-950 text-gray-700 dark:text-gray-300 text-lg font-semibold px-6 py-4">
        {category}
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Question {questionNumber} out of {questionsAmount}
        </p>
        <p className="text-xl text-gray-800 dark:text-gray-200 mb-4">{questionText}</p>
        <div className="grid grid-cols-1 gap-4">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index, option.isCorrect)}
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline block w-full text-left ${
                selectedOption === index
                  ? option.isCorrect
                    ? correctClass
                    : incorrectClass
                  : defaultClass
              }`}
              disabled={answerSelected}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;