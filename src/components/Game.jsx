import Header from './Header';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Game(props) {
  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  };

  //   console.log(props.questions);

  const category = props.questions[0].category;
  const [questions, setQuestions] = useState([]);

  const filterQuestions = () => {
    let questionList = [];
    props.questions.map((item) => {
      let rand = Math.ceil(Math.random() * 4);
      let option = [...item.incorrectAns];
      option.splice(rand, 0, item.correctAns);

      let questionObj = {
        question: item.question,
        correctAns: item.correctAns,
        options: option,
      };
      questionList.push(questionObj);
    });
    setQuestions(questionList);
  };

  useEffect(() => {
    filterQuestions();
  }, []);

  //   {
  //     "question": "What is the birth name of Michael Caine?",
  //     "correctAns": "Maurice Micklewhite",
  //     "options": [
  //         "Morris Coleman",
  //         "Carl Myers",
  //         "Maurice Micklewhite",
  //         "Martin Michaels"
  //     ]
  // }

  return (
    <>
      <div className='game-section'>
        <Header />

        <h2 className='category'>category: music</h2>
        <div className='index'>1 / 10</div>
        <h2 className='question'>What is the birth name of Michael Caine?</h2>
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
          <button className='btn prev'>
            <IoIosArrowBack />
            Previous Question
          </button>
          <button className='btn next'>
            Next Question
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </>
  );
}
