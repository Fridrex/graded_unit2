import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      options: [
        'Physical storage',
        'Centralised control',
        'Cryptography',
        'Government regulation',
      ],
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

const CryptoQuiz = ({ handleQuizOpen }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    userCorrectAnswers: [],
    userWrongAnswers: []
  });
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const { questions } = quiz;
  const { question, options, answer } = questions[activeQuestion];

  useEffect(() => {
    if (isQuizCompleted && result.score === questions.length) {
      sendQuizResult();
    }
  }, [isQuizCompleted, result.score, questions.length]);

  const sendQuizResult = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/learning/progress',{
        module: 'Crypto Quiz',
      }, { withCredentials: true });
      console.log('Quiz result sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending quiz result:', error);
    }


  };

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
            userCorrectAnswers: [...prev.userCorrectAnswers, answer]
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
            userWrongAnswers: [...prev.userWrongAnswers, answer]
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setIsQuizCompleted(true);
    }
  };

  const onAnswerSelect = (select, index) => {
    setSelectedAnswerIndex(index);
    if (select === answer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <>
      <div className="quiz">
        {!isQuizCompleted ? (
          <>
            <div className="quiz__container">
              <div className="quiz-question__numbers">
                <span className="quiz-question--active">Question: {addLeadingZero(activeQuestion + 1)}</span>
                <span className="quiz-question__total">/{addLeadingZero(questions.length)}</span>
              </div>
              <h2>{question}</h2>
              <ul>
                {options.map((answer, index) => (
                  <li
                    onClick={() => onAnswerSelect(answer, index)}
                    key={answer}
                    className={selectedAnswerIndex === index ? 'quiz__selected-answer' : ''}
                  >
                    {answer}
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
              {result.userCorrectAnswers.map((answer, index) => (
                <li key={index} className="quiz__result__correct">
                  {answer}
                </li>
              ))}
            </ul>
            <p>
              Wrong Answers: <span className="quiz__result__wrong">{result.wrongAnswers}</span>
            </p>
            <ul>
              {result.userWrongAnswers.map((answer, index) => (
                <li key={index} className="quiz__result__wrong">
                  {answer}
                </li>
              ))}
            </ul>
            <div className="quiz__button">
              {result.score !== questions.length ? (
                <React.Fragment>
                      <button onClick={() => {
                    setActiveQuestion(0);
                    setSelectedAnswer(null);
                    setResult({
                      score: 0,
                      correctAnswers: 0,
                      wrongAnswers: 0,
                      userCorrectAnswers: [],
                      userWrongAnswers: []
                    });
                    setIsQuizCompleted(false);
                    setSelectedAnswerIndex(null);
                  }}>Retry Quiz</button>

                  <button
                    onClick={() => {
                      handleQuizOpen();
                    }}
                  >
                    Close Quiz
                  </button>
                </React.Fragment>
              ) : (
              <button
                onClick={() => {
                  handleQuizOpen();
                }}
              >
                Close Quiz
              </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CryptoQuiz;
