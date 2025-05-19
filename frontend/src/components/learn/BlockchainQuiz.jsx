/**
 * @file BlockchainQuiz.jsx
 * @description A quiz component specifically about Blockchain technology.
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
  title: 'Blockchain Quiz',
  questions: [
    {
      id: '1',
      question: 'What is the core characteristic of a blockchain?',
      options: ['Centralised control', 'Decentralisation', 'Single authority management', 'Limited access'],
      answer: 'Decentralisation',
    },
    {
      id: '2',
      question: 'Which type of blockchain is open to anyone to view transactions?',
      options: ['Private blockchain', 'Consortium blockchain', 'Public blockchain', 'Permissioned blockchain'],
      answer: 'Public blockchain',
    },
    {
      id: '3',
      question: 'Which of the following is NOT a type of blockchain architecture?',
      options: ['Public', 'Private', 'Federated', 'Personal'],
      answer: 'Personal',
    },
    {
      id: '4',
      question: 'In a public blockchain, how is consensus typically achieved?',
      options: ['Organisation-based', 'Selected nodes', 'Public consensus', 'Permission-based'],
      answer: 'Public consensus',
    },
    {
      id: '5',
      question: 'Which type of blockchain generally offers the highest efficiency?',
      options: [
        'Public blockchain',
        'Private blockchain',
        'All blockchains have equal efficiency',
        'Decentralised blockchain',
      ],
      answer: 'Private blockchain',
    },
  ],
};

/**
 * @function BlockchainQuiz
 * @description Manages the state and logic for the Blockchain quiz.
 * @param {object} props - Component props.
 * @param {function} props.handleQuizOpen - Function to close the quiz modal/view, passed from the parent.
 * @returns {JSX.Element} The Blockchain quiz UI.
 */
const BlockchainQuiz = ({ handleQuizOpen }) => {
  // State to track the current active question index
  const [activeQuestion, setActiveQuestion] = useState(0);
  // State to store whether the currently selected answer is correct (true/false) or null if no answer selected yet for the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // State to store the quiz results: score, number of correct/wrong answers, and lists of user's correct/wrong answers
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
  // isLoading state was present in the original file but not used. Removed for this commented version.
  // If it were used, it would be:
  // const [isLoading, setIsLoading] = useState(true); // State to manage loading status, e.g., while fetching quiz data

  const { questions } = quiz; // Destructure questions from the quiz object
  const { question, options, answer } = questions[activeQuestion]; // Destructure current question details

  // useEffect to send quiz results to the backend if the quiz is completed and all answers are correct.
  useEffect(() => {
    if (isQuizCompleted && result.score === questions.length) {
      sendQuizResult();
    }
    // Dependencies: This effect runs when isQuizCompleted, result.score, or questions.length changes.
  }, [isQuizCompleted, result.score, questions.length]);

  /**
   * @async
   * @function sendQuizResult
   * @description Sends the quiz completion status (specifically for 'Blockchain Quiz') to the backend.
   */
  const sendQuizResult = async () => {
    try {
      // API call to record learning progress
      const response = await axios.post(
        'http://localhost:3000/api/learning/progress',
        {
          module: 'Blockchain Quiz', // Identifies the completed module
        },
        { withCredentials: true } // Sends cookies with the request
      );
      // console.log('Quiz result sent:', response.data); // Optional: log success
    } catch (error) {
      console.error('Error sending quiz result:', error);
      // Optionally, handle UI feedback for error in sending results
    }
  };

  /**
   * @function onClickNext
   * @description Handles the logic when the "Next" or "Finish" button is clicked.
   * It updates the score and results based on the selected answer and moves to the next question or finishes the quiz.
   */
  const onClickNext = () => {
    setSelectedAnswerIndex(null); // Reset selected answer index for the next question
    setResult((prev) =>
      selectedAnswer // If selectedAnswer is true (correct)
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
            userCorrectAnswers: [...prev.userCorrectAnswers, answer], // Add correct answer to list
          }
        : {
            // If selectedAnswer is false (wrong)
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
            userWrongAnswers: [
              ...prev.userWrongAnswers,
              questions[activeQuestion].question + ' (Correct: ' + answer + ')',
            ], // Add question and correct answer to list
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1); // Move to the next question
    } else {
      // setActiveQuestion(0); // Reset active question (though quiz is now completed)
      setIsQuizCompleted(true); // Mark quiz as completed
    }
  };

  /**
   * @function onAnswerSelect
   * @description Handles the selection of an answer option.
   * Sets the selected answer index for UI feedback and determines if the selected answer is correct.
   * @param {string} selectedOption - The text of the answer option selected by the user.
   * @param {number} index - The index of the selected answer option.
   */
  const onAnswerSelect = (selectedOption, index) => {
    setSelectedAnswerIndex(index); // Highlight the selected option
    if (selectedOption === answer) {
      setSelectedAnswer(true); // Mark as correct
    } else {
      setSelectedAnswer(false); // Mark as incorrect
    }
  };

  /**
   * @function addLeadingZero
   * @description Adds a leading zero to a number if it's less than 10.
   * @param {number} number - The number to format.
   * @returns {string|number} The formatted number as a string or the original number.
   */
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <>
      {/* Animated container for the quiz */}
      <motion.div
        className="quiz"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {!isQuizCompleted ? (
          // If quiz is not completed, display questions
          <>
            <div className="quiz__container">
              <div className="quiz-question__numbers">
                {/* Display current question number and total questions */}
                <span className="quiz-question--active">Question: {addLeadingZero(activeQuestion + 1)}</span>
                <span className="quiz-question__total">/{addLeadingZero(questions.length)}</span>
              </div>
              <h2>{question}</h2> {/* Display the current question text */}
              <ul>
                {/* Map through answer options and display them as list items */}
                {options.map((option, index) => (
                  <li
                    onClick={() => onAnswerSelect(option, index)}
                    key={option} // Using option text as key; ensure uniqueness or use id if available
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent default action
                        onAnswerSelect(option, index); // Allow selection with Enter key
                      }
                    }}
                    role='button'
                    aria-selected={selectedAnswerIndex === index}
                    tabIndex={0}
                    className={selectedAnswerIndex === index ? 'quiz__selected-answer' : ''}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <div className="quiz__button">
                {/* Button to move to the next question or finish the quiz */}
                <button onClick={onClickNext} disabled={selectedAnswerIndex === null} role='button' aria-disabled={selectedAnswerIndex === null}>
                  {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </>
        ) : (
          // If quiz is completed, display results
          <div className="quiz__result">
            <h2>Quiz Completed!</h2>
            {/* Display different messages based on whether the user passed */}
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
            {/* List of correctly answered questions (or just the answers) */}
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
            {/* List of incorrectly answered questions and their correct answers */}
            <ul>
              {result.userWrongAnswers.map((wrongAnswerText, index) => (
                <li key={`wrong-${index}`} className="quiz__result__wrong">
                  {wrongAnswerText}
                </li>
              ))}
            </ul>
            <div className="quiz__button">
              {/* Conditional buttons: Retry/Close or just Close */}
              {result.score !== questions.length ? (
                // If not all answers were correct, show Retry and Close buttons
                <React.Fragment>
                  <button
                    onClick={() => {
                      // Reset all quiz states to retry
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
                  <button onClick={handleQuizOpen}>
                    {' '}
                    {/* Calls parent's function to close quiz */}
                    Close Quiz
                  </button>
                </React.Fragment>
              ) : (
                // If all answers were correct, only show Close button
                <button onClick={handleQuizOpen}>Close Quiz</button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default BlockchainQuiz;
