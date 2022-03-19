import React from "react";
import { useDrag } from "react-dnd";

function Choice({ id, word, wordChoices, setWordChoices }) {
  console.log("I'm in Choice now")

  return (
    <>
      <button
        ref={drag}
        style={{ border: isDragging ? "2px solid blue" : "0px" }}
      >
        {word}
      </button>
    </>
  );
}

export default Choice;