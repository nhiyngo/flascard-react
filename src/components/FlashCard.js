import React, { useState } from 'react';

const FlashCard = ({ flashcard: { question, answer, options } }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div onClick={() => setFlip(!flip)}>
      {flip ? answer : question}
    </div>
  );
};

export default FlashCard;
