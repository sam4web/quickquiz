import Header from './Header';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Game({ questions, category }) {
  const [answers, setAnswers] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
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

        <div className='section-container'>
          <h2 className='category'>category: {category}</h2>

          <div className='index'>{questionIdx + 1} / 10</div>
          <h2 className='question'>{currentQuestion.question}</h2>

          <ul className='options'>
            <li className='option selected'>
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
              <span className='btn-text'>Previous Question</span>
            </button>
            <button
              className='btn next'
              disabled={questionIdx >= questions.length - 1}
              onClick={() => {
                setQuestionIdx((prevQuestionIdx) => (prevQuestionIdx += 1));
              }}
            >
              <span className='btn-text'>Next Question</span>
              <IoIosArrowForward />
            </button>
          </div>
          {/* /button-container */}
        </div>
      </div>
    </>
  );
}
