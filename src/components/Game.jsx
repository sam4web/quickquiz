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
  const [answersChecked, setAnswersChecked] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameFinished) {
      document.body.classList.add('end-game');
    } else {
      document.body.classList.remove('end-game');
    }
  }, [gameFinished]);

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
    setAnswersChecked(answers.length >= 10 && !answers.includes(undefined));
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
    let filteredArr = answers.filter(
      (answer, idx) => answer === questions[idx].correctAns
    );
    let score = filteredArr.length;
    setScore(score);
    setGameFinished(true);
  };

  function EndResult({ score }) {
    document.body.classList.add('end-game');
    return (
      <>
        <div className='end-result'>
          <h2 className='title'>congratulation</h2>
          <p className='text'>You answered</p>
          <div className='score'>{score} / 10</div>
          <p className='text'>questions correct</p>

          <button
            className='redirect-link'
            onClick={() => {
              window.location.reload(true);
            }}
          >
            Back to home
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {gameFinished ? <EndResult score={score} /> : ''}
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

            {answersChecked && questionIdx >= questions.length - 1 ? (
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
