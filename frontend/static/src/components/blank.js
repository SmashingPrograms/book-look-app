import { React, useState, useEffect, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";

function Blank({ expectedWord, wordChoices, setWordChoices, data, blankClick, setBlankClick, matchChoiceToBlank, choiceClick, setChoiceClick }) {
 
  const [blank, setBlank] = useState('');
  // props.wordChoices = Game.props.wordChoices;
  // console.log(wordChoices, "in Blank")

  // useEffect(() => {
    
  // });

  console.log(wordChoices, "When it comes into Blanks")
  
  // const addChoiceToBlank = (choice, wordChoices) => {
   
  //   // alert(choice)
  //   console.log("beginning of addChoice", wordChoices)
  //   const expectedWords = data.expected_words;
  //   const chosenWord = choice;
  //   console.log(chosenWord, 'is chosen word')
  //   const expectedWord = expectedWords[expectedIndex];
  //   console.log(expectedWord, 'is expected word')
  //   if (chosenWord === expectedWord) {
  //     alert("You're right! That's correct!");
  //     setBlank(chosenWord);
  //     // const updatedWordChoices = [...wordChoices]
  //     // console.log(updatedWordChoices, "updated word choices")
  //     // updatedWordChoices.splice(updatedWordChoices.indexOf(chosenWord), 1);
  //     console.log("wordChoices +++", wordChoices)
  //     const updatedData = wordChoices.filter((word) => word !== chosenWord);
  //     console.log("updatedData +++", updatedData)
  //     // console.log("set wordchoices stack: ", setWordChoices.stack())
  //     setWordChoices(updatedData);
  //   } else {
  //     alert("WRONG!!!!!!")
  //   };
  // };


  return (
    <>
      {
          (blank === '')
        ?
          <button
            // key={key}
            // ref={drop}
            // type="text"
            onClick={() => {
              // matchChoiceToBlank(choiceClick);
              (blankClick === expectedWord)
              ?
              setBlankClick('')
              // matchChoiceToBlank()
              :
              setBlankClick(expectedWord);
              if (choiceClick === 'SET_BLANK_TO_WORD') {
                console.log("Did I even get here?")
                setBlankClick('');
                setChoiceClick('');
                setBlank(expectedWord);
              };
            }}
            style={{backgroundColor: (blankClick === expectedWord) ? 'lightblue' : 'lightgray' }}
          >
            _______________
          </button>
        :
          blank
      }
    </>
  );
};

export default Blank;