import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from "react-dnd";
import reactStringReplace from 'react-string-replace';
import Choice from './choice';
import Blank from './blank';


function Game(props) {
  const [data, setData] = useState(null);
  const [wordChoices, setWordChoices] = useState(null);
  
  const handleSubmit = async event => {
    event.preventDefault();

    const data = {
      difficulty: 9,
    }

    const response = await fetch('/api/v1/signal/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response not ok!')
    } else {
      const responseData = await response.json();
      setWordChoices(responseData.word_choices);
      setData(responseData);
    };
  };

  // const handleChoice = (updatedWordChoices) => {
  //   console.log('firing', updatedWordChoices);
  //   setWordChoices(updatedWordChoices);
  // }

  let wordChoicesHTML;
  let promptPassage;
  let blanks = 6;
  // useEffect(() => {
  //   console.log("Got to useeffect Game")
  if (data) {
    promptPassage = data.prompt_passage
    promptPassage = reactStringReplace(promptPassage, /_____\(([0-9])\)/g, (expectedIndex, i) => (
      // <input type="text" key={match} />
      // <Blank key={i} id={i} word={match} data={data} />
      <Blank key={i} id={i} data={data} setData={setData} setWordChoices={setWordChoices} expectedIndex={expectedIndex} />
    ));
    wordChoicesHTML = wordChoices.map((word, index) => (
      <Choice key={index} id={index} word={word} />
      // <button key={index}>{word}</button>
    ));
  }
  // })

  // console.log(<span key='1'>_____</span>)

  const gamePrompt = (
    <>
      <div>
        {promptPassage ? promptPassage : ""}
      </div>
      <div>
        {wordChoices ? wordChoicesHTML : ""}
      </div>
    </>
  )

  const game = (
    <>
      <p>{data?.book_title} ({data?.book_year}) by {data?.book_author}</p>
      <p>Genre: {data?.book_genre}</p>
      <div>
        {gamePrompt}
      </div>
      <button>Get a hint</button>
    </>
  )

  

  return (
    <>
      <button onClick={handleSubmit}>Next round</button>
      <div>{data ? game : "Click the button above!"}</div>
    </>
  )
};

export default Game;