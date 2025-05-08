import { useState, useEffect } from 'react';

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

const CbdcQuiz = ({ handleQuizOpen, setSessionId, setIsPassed }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const { questions } = quiz;
  const { question, options, answer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
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
      console.log('Correct');
    } else {
      setSelectedAnswer(false);
      console.log('Wrong');
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
                <span className="quiz-question__total"> of {addLeadingZero(questions.length)}</span>
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
            <p>
              Your score: <span>{result.score}</span> out of <span>{questions.length}</span>
            </p>
            <p>
              Correct Answers: <span className="quiz__result__correct">{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span className="quiz__result__wrong">{result.wrongAnswers}</span>
            </p>
            <div className="quiz__button">
              <button
                onClick={() => {
                  setSessionId(null);
                  handleQuizOpen();
                }}
              >
                Back to Learn
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CbdcQuiz;
