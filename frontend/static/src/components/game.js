import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from "react-dnd";
import reactStringReplace from 'react-string-replace';
import Choice from './choice';
import Blank from './blank';


function Game(props) {
  const [data, setData] = useState(null);
  const [wordChoices, setWordChoices] = useState([]);

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
      setWordChoices([...responseData.word_choices]);
      console.log(wordChoices, "handleSubmit")
      setData(responseData);
      // setWordChoices([...wordChoices])
    };
  };

  // const handleChoice = (updatedWordChoices) => {
  //   console.log('firing', updatedWordChoices);
  //   setWordChoices(updatedWordChoices);
  // }

  // const addChoiceToBlank = (choice, expectedIndex, setBlank) => {
   
  //   // alert(choice)
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
  //     const updatdData = wordChoices.filter((word) => word !== chosenWord);
  //     console.log("updatdData +++", updatdData);
  //     setWordChoices(updatdData);
  //   } else {
  //     alert("WRONG!!!!!!")
  //   };
  // };

  let wordChoicesHTML;
  let promptPassage;
  let blanks = 6;
  // useEffect(() => {
  //   console.log("Got to useeffect Game")
  if (data) {
    console.log(wordChoices, "if data")
    promptPassage = data.prompt_passage
    promptPassage = reactStringReplace(promptPassage, /_____\(([0-9])\)/g, (expectedIndex, i) => (
      // <input type="text" key={match} />
      // <Blank key={i} id={i} word={match} data={data} />
      <Blank key={i} id={i} data={data} setData={setData} wordChoices={wordChoices} setWordChoices={setWordChoices} expectedIndex={expectedIndex} />
    ));
    wordChoicesHTML = wordChoices.map((word, index) => (
      <Choice key={word} id={index} word={word} wordChoices={wordChoices} setWordChoices={setWordChoices} />
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