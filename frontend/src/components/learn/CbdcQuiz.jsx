import React, { useState, useEffect } from 'react';
import axios from 'axios';

const quiz = {
  title: 'CBDC Quiz',
  questions: [
    {
      id: '1',
      question: 'What is a Central Bank Digital Currency (CBDC)?',
      options: [
        'A privately issued currency',
        "A digital form of a country's national currency, issued by the central bank",
        'A decentralised digital currency',
        'A type of cryptocurrency',
      ],
      answer: "A digital form of a country's national currency, issued by the central bank",
    },
    {
      id: '2',
      question: 'In the UK, a CBDC would be a digital form of which currency?',
      options: ['Euro', 'US Dollar', 'Bitcoin', 'Pound Sterling'],
      answer: 'Pound Sterling',
    },
    {
      id: '3',
      question: 'According to the Bank of England, why are they looking into the digital pound?',
      options: [
        'To encourage the use of physical cash',
        'Because the world is becoming more digital and the use of cash is decreasing',
        'To compete with cryptocurrencies',
        'To replace traditional bank accounts',
      ],
      answer: 'Because the world is becoming more digital and the use of cash is decreasing',
    },
    {
      id: '4',
      question: 'Which of the following is a potential benefit of CBDCs?',
      options: [
        'High volatility',
        'Increased efficiency in payments',
        'Decentralised control',
        'Anonymous transactions',
      ],
      answer: 'Increased efficiency in payments',
    },
    {
      id: '5',
      question: 'How does a CBDC typically differ from a cryptocurrency?',
      options: [
        'CBDCs are usually decentralised',
        'CBDCs are issued by a central bank',
        'CBDCs are not digital',
        'CBDCs are highly volatile',
      ],
      answer: 'CBDCs are issued by a central bank',
    },
    {
      id: '6',
      question: 'Is the digital pound a confirmed form of currency?',
      options: [
        'Yes',
        "No, the decision hasn't been made yet",
        'It will be available next year',
        "It's the same as cryptocurrency",
      ],
      answer: "No, the decision hasn't been made yet",
    },
  ],
};

const CbdcQuiz = ({ handleQuizOpen }) => {
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
        module: 'CBDC Quiz',
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

export default CbdcQuiz;
