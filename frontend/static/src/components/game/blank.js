import { React, useState } from "react";

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
              className="blank"
              onClick={() => {
                // matchChoiceToBlank(choiceClick);
                (blankClick === expectedWord)
                ?
                setBoth()
                // matchChoiceToBlank()
                :
                setBlankClick(expectedWord);
              }}
              style={{backgroundColor: (blankClick === expectedWord) ? '#42a1e8' : '#dfe4ea' }}
            >
              _______________
            </button>
            {
              (blankClick === expectedWord)
              ?
              <button id="custom-hint" className="btn btn-success"
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