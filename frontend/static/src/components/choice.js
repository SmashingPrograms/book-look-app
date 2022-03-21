import { React, useState } from "react";

function Choice({ id, word, wordChoices, setWordChoices, blankClick, choiceClick, setChoiceClick, matchChoiceToBlank }) {
  console.log("I'm in Choice now")
  // console.log(click)

  return (
    <>
      <button
        // ref={drag}
        // style={{ border: isDragging ? "2px solid blue" : "0px" }}
        onClick={() => {
          // matchChoiceToBlank(blankClick);
          (choiceClick === word)
          ?
          setChoiceClick('')
          :
          setChoiceClick(word);
          // matchChoiceToBlank();
        }}
        style={{backgroundColor: (word === choiceClick) ? 'lightblue' : 'lightgray' }}
      >
        {word}
      </button>
    </>
  );
}

export default Choice;