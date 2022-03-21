import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from "react-dnd";
import reactStringReplace from 'react-string-replace';
import Choice from './choice';
import Blank from './blank';

function Hints({ hint, setHint, hintsTriggered, setHintsTriggered }) {

  // const postRequest = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-CSRFToken': Cookies.get('csrftoken'),
  //   },
  //   body: JSON.stringify(signal),
  // }

  function setMultiple(data, newData) {
    const objClone = hintsTriggered ? {...hintsTriggered} : {};
    objClone[data] = newData;
    setHintsTriggered(objClone);
    setHint('');
  }

  const getDatamuseData = async (endpoint, desc, data) => {
    let forbiddenStrings = [
      ' ',
      '_',
      ',',
      '.',
      '-',
      '/',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '\'',
      '"',
    ]

    const filterResponse = await fetch('/api/v1/filters/');
    if (!filterResponse.ok) {
      throw new Error('Network response for filters not ok!')
    } else {
      const filterData = await filterResponse.json();
      for (let filter of filterData) {
        forbiddenStrings.push(filter.string)
      }
    }
    // console.log(hint, "hint")
    const hintWord = hint.expectedWord
    const hintId = hint.id
    const wordToCheck = hintWord.toLowerCase()
    const URL = `https://api.datamuse.com/words?${endpoint}=${wordToCheck}`
    const datamuseResponse = await fetch(URL);
    if (!datamuseResponse.ok) {
      throw new Error('Network response for Datamuse not ok!')
    } else {
      const responseData = await datamuseResponse.json();
      console.log(wordToCheck)
      console.log(URL)
      console.log(responseData)

      // filtering against certain strings and undesirable repeat results

      const arrayOfWords = []

      for (let datum of responseData) {
        const word = datum.word
        // console.log(datum.word)
        let toContinue = false;

        // we don't want words that contain the expected word to guess
        // if (word.includes(wordToCheck)) {
        //   continue
        // };

        // sort through forbidden strings including NSFW filter words
        for (let string of forbiddenStrings) {
          if (word.includes(string)) {
            toContinue = true;
            break;
          };
        }
        if (toContinue) {
          continue
        }

        arrayOfWords.push(word.toUpperCase())
      }

      console.log(arrayOfWords)

      if (arrayOfWords.length === 0) {
        alert(`No ${desc} found.`)
      } else {
        const chosenWords = []

        let total;

        // even if the array is less than 5 we still want as many items as we can get
        if (arrayOfWords.length < 5) {
          total = arrayOfWords.length;
        } else {
          total = 5;
        }

        // generate random chosen words
        for (let i = 0; i < total; i++) {
          // while loop because we don't want repeated words
          while (1) {
            const chosenWord = arrayOfWords[Math.floor(Math.random()*arrayOfWords.length)]
            if (chosenWords.includes(chosenWord)) {
              continue;
            }
            chosenWords.push(chosenWord)
            break;
          }
        }

        alert(`Some ${desc} for blank #${hintId} are ${chosenWords}`)
        console.log(chosenWords)


        // NON-MVP

        setHint('')
      }
    }
  }

  return (
    <>
      <h2>Get a hint:</h2>
      <ul>
        <li>
          <a href="#" onClick={() => setMultiple('passageBefore', true)}>Get previous passage</a> for more context
        </li>
        <li>
          <a href="#" onClick={() => setMultiple('passageAfter', true)}>Get next passage</a> for more context
        </li>
        <li>
          <a href="#" onClick={() => getDatamuseData('ml', 'similar words')}>Get words with similar meanings</a>
        </li>
        <li>
          <a href="#" onClick={() => getDatamuseData('rel_rhy', 'rhymes')}>Get words that rhyme</a>
        </li>
      </ul>
    </>
  )
}

export default Hints;