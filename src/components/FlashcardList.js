import React from 'react';
import FlashCard from './FlashCard';

const FlashcardList = ({ flashcards }) => (
  <div className="card-grid">
    {flashcards.map((flashcard) => <FlashCard flashcard={flashcard} key={flashcard.id} />)}
  </div>
);

export default FlashcardList;
