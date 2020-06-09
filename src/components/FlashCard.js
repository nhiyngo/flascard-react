import React, { useState } from 'react';

const FlashCard = ({ flashcard: { question, answer, options } }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >

      <div className="front">
        {question}
        <div className="flashcard-options">
          {options.map((option) => <div className="flashcard-option">{option}</div>)}
        </div>
      </div>

      <div className="back">
        {answer}
      </div>

    </div>
  );
};

export default FlashCard;
