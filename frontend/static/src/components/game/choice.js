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
        className="blank"
        onClick={() => {
          // matchChoiceToBlank(blankClick);
          (choiceClick === word)
          ?
          setChoiceClick('')
          :
          setBoth(word);
          // matchChoiceToBlank();
        }}
        style={{backgroundColor: (word === choiceClick) ? 'rgba(255, 159, 243, 1)' : 'lightgray' }}
        // #C586C0
        // 
      >
        {word}
      </button>
    </>
  );
}

export default Choice;