import { React, useState } from "react";

function Choice({ id, word, wordChoices, setWordChoices, blankClick, choiceClick, setChoiceClick, matchChoiceToBlank, setHint }) {
  // console.log("I'm in Choice now")
  // console.log(click)

  function setBoth(word) {
    setChoiceClick(word)
    setHint('')
  }

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
          setBoth(word);
          // matchChoiceToBlank();
        }}
        style={{backgroundColor: (word === choiceClick) ? '#C586C0' : 'lightgray' }}
      >
        {word}
      </button>
    </>
  );
}

export default Choice;