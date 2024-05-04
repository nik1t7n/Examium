// just a simple game to make website a little bit funnier

import React, { useState } from 'react';

const GuessNumber: React.FC = () => {
  const [secretNumber, setSecretNumber] = useState<number>(generateRandomNumber());
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleGuess = () => {
    const guessedNumber: number = parseInt(guess, 10);
    if (isNaN(guessedNumber)) {
      setMessage('Введите число!');
    } else if (guessedNumber === secretNumber) {
      setMessage(`Поздравляем! Вы угадали число ${secretNumber}!`);
      setSecretNumber(generateRandomNumber());
    } else if (guessedNumber < secretNumber) {
      setMessage('Загаданное число больше.');
    } else {
      setMessage('Загаданное число меньше.');
    }
    setGuess('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex justify-center items-center px-4">
      <div className="max-w-lg w-full bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">Угадай число</h1>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Компьютер загадал число от 1 до 100. Попробуйте угадать его!
        </p>
        <div className="flex items-center mb-4">
          <input
            type="number"
            className="border border-gray-300 dark:border-gray-600 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={guess}
            onChange={handleInputChange}
            placeholder="Введите ваше предположение"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 dark:bg-purple-600 text-white font-bold py-2 px-4 rounded-r"
            onClick={handleGuess}
          >
            Попробовать
          </button>
        </div>
        {message && <p className="text-gray-800 dark:text-white">{message}</p>}
      </div>
    </div>
  );
};

export default GuessNumber;
