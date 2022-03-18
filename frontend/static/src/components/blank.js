import { React, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function Blank({ expectedIndex, data } ) {
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "input",
  //   item: { id: id },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));
  const [blank, setBlank] = useState('');
  const wordChoices = data.word_choices;
  // const [blankWordChoices, setBlankWordChoices] = useState(null)
  // console.log(data)
  // console.log(wordChoices)
  // var wordChoicesVar;
  // if (wordChoices) {
  //   wordChoicesVar = [...wordChoices];
  // };
  // var wordChoicesVar;
  // if (wordChoices) {
  //   setBlankWordChoices([...wordChoices])
  //   setWordChoices(blankWordChoices)
  // }

  // if (blankWordChoices) {
  //   wordChoicesVar = [...blankWordChoices];
  // }
  const expectedWords = data.expected_words;
  // var x = [1, 2];
  const addChoiceToBlank = (choice) => {
    // const pictureList = PictureList.filter((picture) => id === picture.id);
    // console.log(wordChoices[1], 'check me')
    // console.log(wordChoices, 'check here')

    // console.log(wordChoicesVar, "right after")
    const chosenWord = wordChoices[choice]
    const expectedWord = expectedWords[expectedIndex]
    if (chosenWord === expectedWord) {
      alert("You're right! That's correct!");
      setBlank(chosenWord);
      // wordChoicesVar.splice(chosenWord, 1)
      // setBlankWordChoices(wordChoicesVar);
    } else {
      alert("WRONG!!!!!!")
    };
    // console.log(`In ways I got here :f ${condition}`)
    // console.log(data.word_choices[choice])
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "button",
    drop: (item) => addChoiceToBlank(item.id),
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