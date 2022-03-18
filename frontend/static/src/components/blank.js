import { React, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

function Blank({ expected_word, data }) {
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "input",
  //   item: { id: id },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));
  // console.log(expected_word)
  const [blank, setBlank] = useState([]);
  // console.log(data)

  const expected_words = data.expected_words;
  const word_choices = data.word_choices;

  const addChoiceToBlank = (choice) => {
    // const pictureList = PictureList.filter((picture) => id === picture.id);
    const condition = (word_choices[choice] === expected_words[expected_word])
    console.log(`In ways I got here :f ${condition}`)
    // console.log(data.word_choices[choice])
    setBlank(choice);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "button",
    drop: (item) => addChoiceToBlank(item.id),
    collect: (monitor) => ({
      isOver: !monitor.isOver(),
    }),
  }));

  return (
      <input
        // key={key}
        ref={drop}
        type="text"
      />
  );
};

export default Blank;