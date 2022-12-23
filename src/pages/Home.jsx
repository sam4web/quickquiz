import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Game from '../components/Game';
import { nanoid } from 'nanoid';

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionList, setQuestionList] = useState([]);

  // get categories at the beginning
  useEffect(() => {
    getCategories();
  }, []);

  // stores the selected category in selectedCategory state
  useEffect(() => {
    for (let i = 0; i < categoryList.length; i++) {
      let item = categoryList[i];
      if (item.select) {
        setSelectedCategory(item);
        break;
      } else {
        setSelectedCategory({});
      }
    }
  }, [categoryList]);

  // decodes html entities
  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  };

  // Get categories from api to display in options
  // -> Get categories from api
  // -> Filters it
  // -> Stores in categoryList state
  const getCategories = () => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => {
        let categories_list = [];
        data.trivia_categories.map((item) => {
          let itemName = item.name;
          let workNotInclude = ['Entertainment', 'Science'];

          workNotInclude.forEach((word) => {
            if (itemName.includes(word)) {
              itemName = itemName.replace(`${word}: `, '');
            }
          });

          categories_list.push({ name: itemName, select: false, id: item.id });
        });
        setCategoryList(categories_list);
      });
  };

  // function to run when user selects a category and starts the game
  // -> Get questions from selected category by fetching
  // -> Filters questions with filterQuestions() function
  //    -> Create options so correct answer is on random position
  const startGame = () => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${selectedCategory.id}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        setQuestions(filterQuestions(data.results));
        setGameStarted(true);
      });
  };

  // toggle the categoryList state as user selects a category
  const toggleCategory = (id) => {
    setCategoryList((prevCategories) =>
      prevCategories.map((item) => {
        return item.id === id
          ? { ...item, select: !item.select }
          : { ...item, select: false };
      })
    );
  };

  // filters and returns questions
  // -> Create options so correct answer is on random position
  const filterQuestions = (data) => {
    let questionList = [];
    data.map((item) => {
      let rand = Math.floor(Math.random() * 4);
      let options = [];
      let option = [...item.incorrect_answers];
      option.splice(rand, 0, item.correct_answer);

      option.map((item, idx) => {
        options.push({
          id: nanoid(),
          idx: idx,
          name: htmlDecode(item),
          selected: false,
        });
      });

      let questionObj = {
        question: htmlDecode(item.question),
        correctAns: item.correct_answer,
        options: options,
      };
      questionList.push(questionObj);
    });
    return questionList;
  };

  function HomeScreen() {
    return (
      <section className='home-section'>
        <Header type={'home-page'} />

        <div className='section-container'>
          <h2 className='heading'>
            Choose one from the category below and see how many questions you
            can answer correctly out of 10 questions!
          </h2>

          <div className='categories-container'>
            {categoryList.map((category) => (
              <div
                className={`category ${category.select ? 'select' : ''}`}
                key={category.id}
                onClick={() => {
                  toggleCategory(category.id);
                }}
              >
                {category.name}
              </div>
            ))}
          </div>

          <button
            className='btn'
            disabled={Object.keys(selectedCategory).length === 0}
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {gameStarted ? (
        <Game questions={questions} category={selectedCategory.name} />
      ) : (
        <HomeScreen />
      )}
    </>
  );
}
