import React from "react";
import { useDrag } from "react-dnd";

function Choice({ id, word }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "button",
    item: { id: id, word: word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

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