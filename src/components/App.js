import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import FlashcardList from './FlashcardList';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((res) => setCategories(res.data.trivia_categories));
  }, []);

  // to convert HTML encoded characters to normal string text
  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;

    return textArea.value;
  }

  function onFormSubmit(e) {
    e.preventDefault();
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer];

          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        }));
      });
  }

  return (
    <>
      <form action="" className="header" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category </label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Number of Questions </label>
          <input type="number" id="amount" min="1" step="1" defaultValue="10" ref={amountEl} />
        </div>

        <div className="form-group">
          <button type="submit" className="btn">Generate</button>
        </div>

      </form>

      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

// const SAMPLE = [
//   {
//     id: 1,
//     question: 'What is 2 + 2?',
//     answer: '4',
//     options: ['2', '3', '4', '5'],
//   },
//   {
//     id: 2,
//     question: 'Question 2?',
//     answer: 'Answer',
//     options: ['Answer', 'Answer 1', 'Answer 2', 'Answer 3'],
//   },
// ];

export default App;
