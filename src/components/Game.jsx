import Header from './Header';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Game({ questions, category }) {
  const [questionsList, setQuestionList] = useState(questions);
  const [answers, setAnswers] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questionsList[questionIdx]
  );

  useEffect(() => {
    setCurrentQuestion(questionsList[questionIdx]);
  }, [questionIdx]);

  useEffect(() => {
    setQuestionList((prevQuestionList) => {
      let newList = [...prevQuestionList];
      newList[questionIdx] = currentQuestion;
      return newList;
    });
  }, [currentQuestion]);

  const toggleOptions = (option) => {
    setCurrentQuestion((prevCurrectQuestion) => {
      let newOptions = prevCurrectQuestion.options.map((item) =>
        item.idx === option.idx
          ? { ...item, selected: !item.selected }
          : { ...item, selected: false }
      );
      return { ...prevCurrectQuestion, options: newOptions };
    });
    setAnswers((prevAnswers) => {
      let newList = [...prevAnswers];
      newList[questionIdx] = option.name;
      return newList;
    });
  };

  return (
    <>
      <div className='game-section'>
        <Header />

        <div className='section-container'>
          <h2 className='category'>category: {category}</h2>

          <div className='index'>{questionIdx + 1} / 10</div>
          <h2 className='question'>{currentQuestion.question}</h2>

          <ul className='options'>
            {currentQuestion.options.map((option) => (
              <li
                className={`option ${option.selected ? 'selected' : ''}`}
                key={option.id}
                onClick={() => toggleOptions(option)}
              >
                <div className='radio-dot'></div>
                {option.name}
              </li>
            ))}
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
