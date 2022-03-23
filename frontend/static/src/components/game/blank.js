import { React, useState, useEffect, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import Hints from "./hints";

function Blank({ id, expectedWord, wordChoices, setWordChoices, data, blankClick, setBlankClick, matchChoiceToBlank, choiceClick, setChoiceClick, hint, setHint }) {
 
  const [blank, setBlank] = useState('');

  // console.log(wordChoices, "When it comes into Blanks")
  
  function setBoth() {
    setHint('');
    setBlankClick('');
  }

  return (
    <>
      {
          (blank === '')
        ?
          <>
            <button
              // key={key}
              // ref={drop}
              // type="text"
              onClick={() => {
                // matchChoiceToBlank(choiceClick);
                (blankClick === expectedWord)
                ?
                setBoth()
                // matchChoiceToBlank()
                :
                setBlankClick(expectedWord);
              }}
              style={{backgroundColor: (blankClick === expectedWord) ? 'lightblue' : 'lightgray' }}
            >
              _______________
            </button>
            {
              (blankClick === expectedWord)
              ?
              <button
                onClick={() => {
                  hint
                  ?
                  setHint('')
                  :
                  setHint({
                    expectedWord: expectedWord,
                    id: id,
                  });
                }}
              >Hint</button>
              :
              ''
            }
          </>
        :
          blank
      }
    </>
  );
};

export default Blank;