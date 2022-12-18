import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Navbar from '../components/Header';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    for (let i = 0; i < categories.length; i++) {
      let item = categories[i];
      if (item.select) {
        setSelectedItem(item);
        break;
      } else {
        setSelectedItem({});
      }
    }
  }, [categories]);

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

          categories_list.push({ name: itemName, select: false, id: nanoid() });
        });
        setCategories(categories_list);
      });
  };

  const startGame = () => {
    setGameStarted((prevGameStarted) => !prevGameStarted);
    console.log(selectedItem);
  };

  const selectCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((item) => {
        return item.id === id
          ? { ...item, select: !item.select }
          : { ...item, select: false };
      })
    );
  };

  function HomeScreen() {
    return (
      <>
        <Navbar type={'home-page'} />

        <h2 className='heading'>
          Choose one from the categories below and see how many questions you
          can answer correctly out of 10 questions!
        </h2>

        <div className='categories-container'>
          {categories.map((category) => (
            <div
              className={`category ${category.select ? 'select' : ''}`}
              key={category.id}
              onClick={() => {
                selectCategory(category.id);
              }}
            >
              {category.name}
            </div>
          ))}
        </div>

        <button
          className='btn'
          disabled={Object.keys(selectedItem).length === 0}
          onClick={startGame}
        >
          Start Game
        </button>
      </>
    );
  }

  return (
    <>
      <div className='home-page'>
        {gameStarted ? <HomeScreen /> : <h1>Game Started</h1>}
      </div>
    </>
  );
}
