import Cookies from 'js-cookie';
import { useState } from 'react';
import reactStringReplace from 'react-string-replace';

function Game(props) {
  const [data, setData] = useState(null)

  const handleSubmit = async event => {
    event.preventDefault();

    const data = {
      difficulty: 5,
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
      console.log(responseData)
      setData(responseData)
    };
  };

  let promptPassage;
  let blanks = 6;

  if (data) {
    promptPassage = data?.prompt_passage
    promptPassage = reactStringReplace(promptPassage, /_____\(([0-9])\)/g, (match, i) => (
      <button key={match}>____________{match}</button>
    ));
    // for (let i = 1; i <= blanks; i++) {
    //   const substring = new RegExp(``);
    // promptPassage = promptPassage.replace(/_____\(([0-9])\)/g, <span key='$1'>_____</span>)
    // }
    // const blankInstances = .matchAll(substring);
    // const blanks = [];
    // for (const instance of blankInstances) {
    //   blanks.push(instance[0]);
    // };
  }

  // console.log(<span key='1'>_____</span>)
  const gamePrompt = (
    <>
      {promptPassage ? promptPassage : ""}
    </>
  )

  const game = (
    <>
      <p>{data?.book_title} ({data?.book_year}) by {data?.book_author}</p>
      <p>Genre: {data?.book_genre}</p>
      <div>
        {gamePrompt}
      </div>
      <div>
        {data?.word_choices.map((word, index) => (
          <button key={index}>{word}</button>
        ))}
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