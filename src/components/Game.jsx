import Header from './Header';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiFillPieChart } from 'react-icons/ai';

export default function Game({ questions, category }) {
  const [questionsList, setQuestionList] = useState(questions);
  const [answers, setAnswers] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questionsList[questionIdx]
  );
  const [gameFinished, setgameFinished] = useState(false);

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

  useEffect(() => {
    setgameFinished(answers.length >= 10 && !answers.includes(undefined));
  }, [answers]);

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
      if (newList[questionIdx] !== option.name) {
        newList[questionIdx] = option.name;
      } else {
        newList[questionIdx] = undefined;
      }
      return newList;
    });
  };

  const getResult = () => {
    console.log('game finished');
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

            {gameFinished && questionIdx >= questions.length - 1 ? (
              <button className='btn next' onClick={getResult}>
                <span className='btn-text'>Check Results</span>
                <AiFillPieChart />
              </button>
            ) : (
              <button
                className='btn next'
                disabled={questionIdx >= questions.length - 1}
                onClick={() => {
                  setQuestionIdx((prevQuestionIdx) => (prevQuestionIdx += 1));
                }}
              >
                <span className='btn-text'>Next</span>
                <IoIosArrowForward />
              </button>
            )}
          </div>
          {/* /button-container */}
        </div>
      </div>
    </>
  );
}
