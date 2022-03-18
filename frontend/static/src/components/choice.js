import React from "react";
import { useDrag } from "react-dnd";

function Choice({ id, word }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "button",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  console.log("Got here")

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