// service card just to display options in admin panel

import React from 'react';

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
  questionId: number;
}

const OptionCard: React.FC<{ option: Option }> = ({ option }) => {
  const correctClass = option.isCorrect ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="option-field mb-2">
        <span className="font-bold">Option ID:</span>
        <div className="bg-gray-50 rounded p-2">{option.id}</div>
      </div>
      <div className="option-field mb-2">
        <span className="font-bold">Text:</span>
        <div className="bg-gray-50 rounded p-2">{option.text}</div>
      </div>
      <div className="option-field mb-2">
        <span className="font-bold">Correct:</span>
        <div className={`bg-gray-50 rounded p-2 ${correctClass}`}>{option.isCorrect ? 'True' : 'False'}</div>
      </div>
      <div className="option-field mb-2">
        <span className="font-bold">Question ID:</span>
        <div className="bg-gray-50 rounded p-2">{option.questionId}</div>
      </div>
    </div>
  );
};

export default OptionCard;
