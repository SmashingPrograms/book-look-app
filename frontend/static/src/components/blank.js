import { React, useState, useEffect, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";

function Blank({ expectedIndex, data, setWordChoices} ) {
 
  const [blank, setBlank] = useState('');
  const wordChoices = [...data.word_choices];
  const expectedWords = data.expected_words;
 
  const addChoiceToBlank = async (choice) => {
   
    // alert(choice)
    const chosenWord = choice;
    console.log(chosenWord, 'is chosen word')
    const expectedWord = expectedWords[expectedIndex];
    console.log(expectedWord, 'is expected word')
    if (chosenWord === expectedWord) {
      alert("You're right! That's correct!");
      setBlank(chosenWord);
      const updatedWordChoices = [...wordChoices]
      updatedWordChoices.splice(updatedWordChoices.indexOf(chosenWord), 1);
      setWordChoices(updatedWordChoices);
    } else {
      alert("WRONG!!!!!!")
    };
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "button",
    // drop: (item) => addChoiceToBlank(item.word),
    drop: (item) => addChoiceToBlank(item.word),
    collect: (monitor) => ({
      isOver: !monitor.isOver(),
    }),
  }));

  return (
    <>
      {
        (blank === '')
        ?
          <input
            // key={key}
            ref={drop}
            type="text"
          />
        :
          blank
      }
    </>
  );
};

export default Blank;