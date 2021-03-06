import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from "react-dnd";
import reactStringReplace from 'react-string-replace';
import Choice from './choice';
import Blank from './blank';
import Hints from './hints';
import PreviousHints from './previousHints';


function Game({ auth, profile, setProfile }) {
  const [data, setData] = useState(null);
  const [secondaryData, setSecondaryData] = useState(null);
  const [wordChoices, setWordChoices] = useState([]);
  const [choiceClick, setChoiceClick] = useState('');
  const [blankClick, setBlankClick] = useState('');
  const [hint, setHint] = useState('');
  const [hintsTriggered, setHintsTriggered] = useState(null);
  const [guessedCorrect, setGuessedCorrect] = useState([]);
  const [points, setPoints] = useState(auth ? JSON.parse(localStorage.getItem('profile')).points : 0);
  const [pointIncrement, setPointIncrement] = useState(0);

  useEffect(() => sendSignal(), [])
/*
{
    passageBefore: false,
    passageAfter: false,
    similarWords: [],
    rhymes: [],
  }
*/
  const signal = {
    difficulty: 9,
  }

  const managePoints = (symbol, amount, answer) => {
    let pointsCopy = pointIncrement
    // console.log(pointsCopy, 'pointsCopy')
    if (answer !== undefined) {
      amount = (answer.length / 4).toFixed() * amount // a weight of 1 at 4: 4 / 4 = 1. therefore 4 - (1*1) = 3
    }
    // console.log(amount, "amount")
    if (symbol === '+') {
      pointsCopy += amount;
    } else if (symbol === '-') {
      pointsCopy -= amount;
    }
    setPointIncrement(pointsCopy);
  };

  const pushPointsToDatabase = async (points) => {

    setPoints(points)

    if (auth) {
      const dataToPush = {...profile};
      dataToPush.points = points;
      setProfile(dataToPush)
      const response = await fetch(`/api/v1/profiles/${profile.id}/`)
        // body: JSON.stringify(dataToPush),

      const dataToGet = await response.json();

      if (!response.ok) {
        throw new Error('Network response for profile get request not ok!');
      } else {
        // console.log(dataToGet)
        // Cookies.set('Authorization', `Token ${dataToGet.key}`);
        console.log(dataToGet)
        dataToGet.points = points;
        delete dataToGet.avatar;
        const responsePut = await fetch(`/api/v1/profiles/${profile.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
          },
          body: JSON.stringify(dataToGet),
        });

        if (!responsePut.ok) {
          throw new Error('Network response for profile put request not ok!');
        } else {
          console.log('Got thru that ok')
        }
        // saveProfileData(data.profile, data.username)
      }
    }
  }

  const postRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify(signal),
  }

  
  const addPoints = () => {
    const pointsSum = points + pointIncrement;
    console.log(points, 'points')
    console.log(pointIncrement, 'pointIncrement')
    console.log(pointsSum, 'pointsSum')
    if (pointsSum > 0) {
      pushPointsToDatabase(pointsSum)
    } else {
      pushPointsToDatabase(0);
    }
  }

  const startPointIncrement = (expectedWords) => {
    // generate initial points
    let pointsToStartWith = 0;
    // const expectedWords = responseData.expected_words
    for (let datum of expectedWords) {
      pointsToStartWith += datum.length;
    }
    setPointIncrement(pointsToStartWith)
    // console.log(pointIncrement)
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
        startPointIncrement(responseData.expected_words)
      }
    };
  }

  const switcheroo = () => {
    setWordChoices([...secondaryData.word_choices]);
    setData({...secondaryData});
    startPointIncrement(secondaryData.expected_words)
    setGuessedCorrect([]);
  }

  const handleSubmit = event => {
    event.preventDefault();

    sendSignal();
    // switcheroo();
  };

  var matchChoiceToBlank = (stateToCheck) => {
    if ((blankClick !== "") && (choiceClick !== "")) {
      if (choiceClick === blankClick) {
        // setChoiceClick('SET_BLANK_TO_WORD');
        setGuessedCorrect([...guessedCorrect, choiceClick]);
        if (guessedCorrect.length === 5) {
          alert(`Amazing! You got through past this passage!\n\n${pointIncrement > 0 ? `+ ${pointIncrement} points` : pointIncrement < 0 ? `- ${Math.abs(pointIncrement)} points` : pointIncrement === 0 ? `No points gained or lost.` : ''}`);
          setHint('');
          setHintsTriggered(null)
          addPoints(pointIncrement);
          setPointIncrement(0);
          switcheroo();
        } else {
          alert("Great job! You got that right!");
          if (guessedCorrect.length === 0) {
            sendSignal();
          }
        }
      } else {
        alert("Dang! You were wrong!");
        managePoints('-', 2, blankClick)
      };
      setChoiceClick('');
      setBlankClick('');
    };
  };





  
  useEffect(() => matchChoiceToBlank());



  // Blanks component coming out with keys and ids of odd numbers instead of 1, 2, 3, etc. This converts those odd numbers to something usable.
  function convertOddToCounting(i) {
    return (i/2).toFixed()
  }



  let wordChoicesHTML;
  let promptPassage;
  // useEffect(() => {
  //   console.log("Got to useeffect Game")
  if (data) {
    // console.log(wordChoices, "if data")
    promptPassage = data.prompt_passage
    promptPassage = reactStringReplace(promptPassage, /_____\(([0-9])\)/g, (expectedIndex, i) => (
      // <input type="text" key={match} />
      // <Blank key={i} id={i} word={match} data={data} />
      guessedCorrect.includes(data.expected_words[expectedIndex].toString())
      ?
      data.expected_words[expectedIndex].toString()
      :
      <Blank key={convertOddToCounting(i)} id={convertOddToCounting(i)} data={data} setData={setData} wordChoices={wordChoices} setWordChoices={setWordChoices} expectedWord={data.expected_words[expectedIndex].toString()} blankClick={blankClick} setBlankClick={setBlankClick} matchChoiceToBlank={matchChoiceToBlank} choiceClick={choiceClick} setChoiceClick={setChoiceClick} hint={hint} setHint={setHint} />
    ));
    wordChoicesHTML = wordChoices.map((word, index) => (
      guessedCorrect.includes(word)
      ?
      ''
      :
      <Choice key={word} id={index+7} word={word} wordChoices={wordChoices} setWordChoices={setWordChoices} choiceClick={choiceClick} setChoiceClick={setChoiceClick} matchChoiceToBlank={matchChoiceToBlank} blankClick={blankClick} setHint={setHint} />
      // <button key={index}>{word}</button>
    ));
  }
  // })

  // console.log(<span key='1'>_____</span>)

  const game = (
    <div className="game">
      <div className="passageInfo">
        <h2>{data?.book_title} ({data?.book_year}) by {data?.book_author}</h2>
        <p>Genre: {data?.book_genre}</p>
        <p>Total points: {points} &nbsp; Possible points: {pointIncrement}</p>
      </div>
      <div className="passage">
        . . . &nbsp;
        {hintsTriggered?.passageBefore ? ` ${data.passage_before} ` : ''}
        {promptPassage ? promptPassage : ""}
        {hintsTriggered?.passageAfter ? ` ${data.passage_after} ` : ''}
        &nbsp; . . .
      </div>
      <div className="choices">
        {
          hint
          ?
          <Hints hint={hint} setHint={setHint} hintsTriggered={hintsTriggered} setHintsTriggered={setHintsTriggered} managePoints={managePoints} pointIncrement={pointIncrement} />
          :
          <div className="wordChoices">
            {wordChoices ? wordChoicesHTML : ""}
          </div>
          // hintsTriggered
          // ?
          // <PreviousHints hintsTriggered={hintsTriggered} />
          // :
          // ''
        }
      </div>
    </div>
  )

  

  return (
    <>
      {/* <button onClick={handleSubmit}>Next round</button> */}
      <div>{data ? game : "Loading data..."}</div>
    </>
  )
};

export default Game;