/**
 * @file CryptoQuiz.jsx
 * @description A quiz component specifically about Cryptocurrencies.
 * It presents multiple-choice questions, tracks user answers, calculates scores,
 * and provides feedback. On successful completion, it can send results to a backend.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import { motion } from 'motion/react'; // For animations
import { pageVariants, pageTransition } from '../../utils/utils'; // Animation utility constants

// Quiz data: title and an array of questions.
// Each question has an id, the question text, an array of options, and the correct answer.
const quiz = {
  title: 'Cryptocurrency Quiz',
  questions: [
    {
      id: '1',
      question: 'What is a cryptocurrency?',
      options: [
        'A physical form of currency',
        'A type of digital currency using cryptography',
        'Currency controlled by a single bank',
        'Traditional currency in digital form',
      ],
      answer: 'A type of digital currency using cryptography',
    },
    {
      id: '2',
      question: 'What does "decentralisation" mean in the context of cryptocurrency?',
      options: [
        'It is controlled by a central authority',
        'It is regulated by the government',
        'No single entity controls it',
        'It has a fixed value',
      ],
      answer: 'No single entity controls it',
    },
    {
      id: '3',
      question: 'Which of the following is a crucial aspect of cryptocurrency security?',
      options: ['Physical storage', 'Centralised control', 'Cryptography', 'Government regulation'],
      answer: 'Cryptography',
    },
    {
      id: '4',
      question: 'What is a digital wallet used for?',
      options: [
        'Storing physical currency',
        'Storing, sending and receiving cryptocurrencies',
        'Managing bank accounts',
        'Printing cryptocurrency',
      ],
      answer: 'Storing, sending and receiving cryptocurrencies',
    },
    {
      id: '5',
      question: 'What is a private key?',
      options: [
        'A code shared to receive cryptocurrency',
        'A public code for transactions',
        'A secret code to access and spend cryptocurrency',
        'A publicly available code',
      ],
      answer: 'A secret code to access and spend cryptocurrency',
    },
    {
      id: '6',
      question: 'In a Proof-of-Work system, what is "mining"?',
      options: [
        'Holding cryptocurrency to support the network',
        'Validating transactions by solving complex puzzles',
        'Transferring cryptocurrency from one wallet to another',
        'Exchanging cryptocurrency for traditional currency',
      ],
      answer: 'Validating transactions by solving complex puzzles',
    },
  ],
};

/**
 * @function CryptoQuiz
 * @description Manages the state and logic for the Cryptocurrency quiz.
 * @param {object} props - Component props.
 * @param {function} props.handleQuizOpen - Function to close the quiz modal/view, passed from the parent.
 * @returns {JSX.Element} The Cryptocurrency quiz UI.
 */
const CryptoQuiz = ({ handleQuizOpen }) => {
  // State to track the current active question index
  const [activeQuestion, setActiveQuestion] = useState(0);
  // State to store whether the currently selected answer is correct (true/false) or null
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // State to store the quiz results
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    userCorrectAnswers: [],
    userWrongAnswers: [],
  });
  // State to track if the quiz has been completed
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  // State to store the index of the answer option selected by the user
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const { questions } = quiz; // Destructure questions from the quiz object
  const { question, options, answer } = questions[activeQuestion]; // Destructure current question details

  // useEffect to send quiz results to the backend if the quiz is completed and all answers are correct.
  useEffect(() => {
    if (isQuizCompleted && result.score === questions.length) {
      sendQuizResult();
    }
  }, [isQuizCompleted, result.score, questions.length]); // Dependencies

  /**
   * @async
   * @function sendQuizResult
   * @description Sends the quiz completion status (specifically for 'Crypto Quiz') to the backend.
   */
  const sendQuizResult = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/learning/progress',
        { module: 'Crypto Quiz' },
        { withCredentials: true }
      );
      // console.log('Crypto Quiz result sent successfully'); // Optional
    } catch (error) {
      console.error('Error sending crypto quiz result:', error);
    }
  };

  /**
   * @function onClickNext
   * @description Handles logic when "Next" or "Finish" is clicked. Updates results and question.
   */
  const onClickNext = () => {
    setSelectedAnswerIndex(null); // Reset for next question
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
            userCorrectAnswers: [...prev.userCorrectAnswers, answer],
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
            userWrongAnswers: [
              ...prev.userWrongAnswers,
              questions[activeQuestion].question + ' (Correct: ' + answer + ')',
            ],
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      // setActiveQuestion(0); // No need to reset activeQuestion if quiz is completed
      setIsQuizCompleted(true);
    }
  };

  /**
   * @function onAnswerSelect
   * @description Handles selection of an answer option.
   * @param {string} selectedOption - The text of the selected answer.
   * @param {number} index - The index of the selected answer.
   */
  const onAnswerSelect = (selectedOption, index) => {
    setSelectedAnswerIndex(index);
    setSelectedAnswer(selectedOption === answer); // Sets selectedAnswer to true if correct, false otherwise
  };

  /**
   * @function addLeadingZero
   * @description Adds a leading zero to a number if it's less than 10.
   * @param {number} number - The number to format.
   * @returns {string|number} Formatted number.
   */
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <>
      <motion.div
        className="quiz"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {!isQuizCompleted ? (
          // Quiz in progress view
          <>
            <div className="quiz__container">
              <div className="quiz-question__numbers">
                <span className="quiz-question--active">Question: {addLeadingZero(activeQuestion + 1)}</span>
                <span className="quiz-question__total">/{addLeadingZero(questions.length)}</span>
              </div>
              <h2>{question}</h2>
              <ul>
                {options.map((option, index) => (
                  <li
                    onClick={() => onAnswerSelect(option, index)}
                    key={option} // Assuming option text is unique for key purposes
                    className={selectedAnswerIndex === index ? 'quiz__selected-answer' : ''}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <div className="quiz__button">
                <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                  {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </>
        ) : (
          // Quiz completed view (results)
          <div className="quiz__result">
            <h2>Quiz Completed!</h2>
            {result.score === questions.length ? (
              <p>Congratulations! You have successfully completed the quiz. Your result has been stored.</p>
            ) : (
              <p>
                Unfortunately, you did not pass the quiz. Don't worry, you can retry the quiz to improve your score.
              </p>
            )}
            <p>
              Your score: <span>{result.score}</span> out of <span>{questions.length}</span>
            </p>
            <p>
              Correct Answers: <span className="quiz__result__correct">{result.correctAnswers}</span>
            </p>
            <ul>
              {result.userCorrectAnswers.map((correctAnswerText, index) => (
                <li key={`correct-${index}`} className="quiz__result__correct">
                  {correctAnswerText}
                </li>
              ))}
            </ul>
            <p>
              Wrong Answers: <span className="quiz__result__wrong">{result.wrongAnswers}</span>
            </p>
            <ul>
              {result.userWrongAnswers.map((wrongAnswerText, index) => (
                <li key={`wrong-${index}`} className="quiz__result__wrong">
                  {wrongAnswerText}
                </li>
              ))}
            </ul>
            <div className="quiz__button">
              {result.score !== questions.length ? (
                <React.Fragment>
                  <button
                    onClick={() => {
                      // Reset states to retry quiz
                      setActiveQuestion(0);
                      setSelectedAnswer(null);
                      setResult({
                        score: 0,
                        correctAnswers: 0,
                        wrongAnswers: 0,
                        userCorrectAnswers: [],
                        userWrongAnswers: [],
                      });
                      setIsQuizCompleted(false);
                      setSelectedAnswerIndex(null);
                    }}
                  >
                    Retry Quiz
                  </button>
                  <button onClick={handleQuizOpen}>Close Quiz</button>
                </React.Fragment>
              ) : (
                <button onClick={handleQuizOpen}>Close Quiz</button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default CryptoQuiz;
