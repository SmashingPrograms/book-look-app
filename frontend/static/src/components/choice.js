import { React, useState } from "react";

function Choice({ id, word, wordChoices, setWordChoices, choiceClick, setChoiceClick }) {
  console.log("I'm in Choice now")
  // console.log(click)

  return (
    <>
      <button
        // ref={drag}
        // style={{ border: isDragging ? "2px solid blue" : "0px" }}
        onClick={() => {
          (choiceClick === word)
          ?
          setChoiceClick('')
          :
          setChoiceClick(word);
        }}
        style={{backgroundColor: (word === choiceClick) ? 'lightblue' : 'lightgray' }}
      >
        {word}
      </button>
    </>
  );
}

export default Choice;