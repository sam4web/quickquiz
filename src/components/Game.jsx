import Header from './Header';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Game({ questions, category }) {
  const [answers, setAnswers] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(
    questions[questionIdx]
  );

  useEffect(() => {}, []);

  useEffect(() => {
    setCurrentQuestion(questions[questionIdx]);
    console.log(questions.length);
  }, [questionIdx]);

  return (
    <>
      <div className='game-section'>
        <Header />

        <h2 className='category'>category: {category}</h2>

        <div className='index'>{questionIdx + 1} / 10</div>
        <h2 className='question'>{currentQuestion.question}</h2>

        <ul className='options'>
          <li className='option select'>
            <div className='radio-dot'></div> Morris Coleman
          </li>
          <li className='option'>
            <div className='radio-dot'></div> Carl Myers
          </li>
          <li className='option'>
            <div className='radio-dot'></div> Maurice Micklewhite
          </li>
          <li className='option'>
            <div className='radio-dot'></div> Martin Michaels
          </li>
        </ul>

        <div className='button-container'>
          <button
            className='btn prev'
            disabled={questionIdx <= 0}
            onClick={() => {
              setQuestionIdx((prevQuestionIdx) => (prevQuestionIdx -= 1));
            }}
          >
            <IoIosArrowBack />
            Previous Question
          </button>
          <button
            className='btn next'
            disabled={questionIdx >= questions.length - 1}
            onClick={() => {
              setQuestionIdx((prevQuestionIdx) => (prevQuestionIdx += 1));
            }}
          >
            Next Question
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
