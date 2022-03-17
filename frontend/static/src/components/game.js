import Cookies from 'js-cookie';
import { useState } from 'react';

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

  const gamePrompt = (
    <>
      <p>{data?.book_title} ({data?.book_year}) by {data?.book_author}</p>
      <p>Genre: {data?.book_genre}</p>
      <div>
        {data?.prompt_passage}
      </div>
      <div>
        {data?.word_choices.map((word, index) => (
          <button key={index}>{word}</button>
        ))}
      </div>
    </>
  )

  return (
    <>
      <button onClick={handleSubmit}>Next round</button>
      <div>{data ? gamePrompt : "Click the button above!"}</div>
    </>
  )
};

export default Game;