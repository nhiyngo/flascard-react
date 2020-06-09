import React, { useState, useEffect } from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    const responses = await axios.get('https://opentdb.com/api.php?amount=10');

    const questions = responses.data.results.map((questionItem, index) => {
      const answer = questionItem.correct_answer;
      const options = [...questionItem.incorrect_answers, answer];

      return {
        id: `${index}-${Date.now()}`,
        question: questionItem.question,
        answer,
        options: options.sort(() => Math.random() - 0.5),
      };
    });

    setFlashcards(questions);
  };

  return (
    <FlashcardList flashcards={flashcards} />
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
