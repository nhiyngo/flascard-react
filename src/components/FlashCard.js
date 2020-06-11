import React, { useState, useEffect, useRef } from 'react';

const FlashCard = ({ flashcard: { question, answer, options } }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.clientHeight;
    const backHeight = backEl.current.clientHeight;

    setHeight(Math.max(frontHeight, backHeight, 100));
  }

  // useEffect() invokes (recalculate the height depends on the length of the elements)
  // every time either of these elements in [question,answer,options] changes
  useEffect(() => {
    setMaxHeight();
  }, [question, answer, options]);

  // to recalculate the height of the cards every time our page resizes
  // empty [] means occurs only the first time the component loads
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height }}
      onClick={() => setFlip(!flip)}
    >

      <div className="front" ref={frontEl}>
        {question}
        <div className="flashcard-options">
          {options.map((option) => <div key={option} className="flashcard-option">{option}</div>)}
        </div>
      </div>

      <div className="back" ref={backEl}>
        {answer}
      </div>

    </div>
  );
};

export default FlashCard;
