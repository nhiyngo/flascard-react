import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FlashcardList from './FlashcardList';
import './app.css';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  const getCategory = async () => {
    const responses = await axios.get('https://opentdb.com/api_category.php');

    const selections = responses.data.trivia_categories;

    setCategories(selections);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getQuestions = async () => {
    const responses = await axios.get('https://opentdb.com/api.php?amount=10');

    const questions = responses.data.results.map((questionItem, index) => {
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
    });

    setFlashcards(questions);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // to convert HTML encoded characters to normal string text
  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;

    return textArea.value;
  }

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form action="" className="header" onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category </label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
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

const SAMPLE = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
    options: ['2', '3', '4', '5'],
  },
  {
    id: 2,
    question: 'Question 2?',
    answer: 'Answer',
    options: ['Answer', 'Answer 1', 'Answer 2', 'Answer 3'],
  },
];

export default App;
