import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from "react-dnd";
import reactStringReplace from 'react-string-replace';
import Choice from './choice';
import Blank from './blank';


function Game(props) {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [wordChoices, setWordChoices] = useState([]);
  const [choiceClick, setChoiceClick] = useState('');
  const [blankClick, setBlankClick] = useState('');
  const [guessedCorrect, setGuessedCorrect] = useState([]);

  const signal = {
    difficulty: 9,
  }

  const postRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify(signal),
  }

  const sendSignal = async () => {
    let response;
    let responseData;
    // if (data) {
    //   setData([...secondaryData]);
    // } else {
    //   response = await fetch('/api/v1/signal/', postRequest);

    //   if (!response.ok) {
    //     throw new Error('Network response for primary data not ok!')
    //   } else {
    //     responseData = await response.json();
    //     setWordChoices([...responseData.word_choices]);
    //     console.log(wordChoices, "handleSubmit")
    //     setData(responseData);
    //     // setWordChoices([...wordChoices])
    //   };
    // }

    response = await fetch('/api/v1/signal/', postRequest);
    if (!response.ok) {
      throw new Error('Network response for secondary data not ok!')
    } else {
      responseData = await response.json();
      // setWordChoices([...responseData.word_choices]);
      // console.log(wordChoices, "handleSubmit")
      setSecondaryData(responseData);
      if (!data) {
        setWordChoices([...responseData.word_choices]);
        setData({...responseData});
      }
    };
  }

  const switcheroo = () => {
    setWordChoices([...secondaryData.word_choices]);
    setData({...secondaryData});
    setGuessedCorrect([]);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    sendSignal();
    // switcheroo();
  };

  var matchChoiceToBlank = (stateToCheck) => {
    if ((blankClick !== "") && (choiceClick !== "")) {
      console.log("Did I even get here?")
      if (choiceClick === blankClick) {
        // setChoiceClick('SET_BLANK_TO_WORD');
        setGuessedCorrect([...guessedCorrect, choiceClick])
        if (guessedCorrect.length === 5) {
          alert("Amazing! You got past this passage!")
          switcheroo();
        } else {
          alert("Great job! You got that right!");
          if (guessedCorrect.length === 0) {
            sendSignal();
          }
        }
      } else {
        alert("Dang! You were wrong!");
      };
      setChoiceClick('');
      setBlankClick('');
    };
  };

  useEffect(() => matchChoiceToBlank());

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
      guessedCorrect.includes(data.expected_words[expectedIndex].toString())
      ?
      data.expected_words[expectedIndex].toString()
      :
      <Blank key={i} id={i} data={data} setData={setData} wordChoices={wordChoices} setWordChoices={setWordChoices} expectedWord={data.expected_words[expectedIndex].toString()} blankClick={blankClick} setBlankClick={setBlankClick} matchChoiceToBlank={matchChoiceToBlank} choiceClick={choiceClick} setChoiceClick={setChoiceClick} />
    ));
    wordChoicesHTML = wordChoices.map((word, index) => (
      guessedCorrect.includes(word)
      ?
      ''
      :
      <Choice key={word} id={index} word={word} wordChoices={wordChoices} setWordChoices={setWordChoices} choiceClick={choiceClick} setChoiceClick={setChoiceClick} matchChoiceToBlank={matchChoiceToBlank} blankClick={blankClick} />
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