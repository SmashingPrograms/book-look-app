import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from "react-dnd";
import reactStringReplace from 'react-string-replace';
import Choice from './choice';
import Blank from './blank';

function Hints({ hint, setHint, hintsTriggered, setHintsTriggered }) {

  function setMultiple(data, newData) {
    const objClone = hintsTriggered ? {...hintsTriggered} : {};
    objClone[data] = newData;
    setHintsTriggered(objClone);
    setHint('');
  }

  return (
    <>
      <h2>Get a hint:</h2>
      <ul>
        <li>
          <a onClick={() => setMultiple('passageBefore', true)}>Get previous passage</a> for more context
        </li>
        <li>
          <a onClick={() => setMultiple('passageAfter', true)}>Get next passage</a> for more context
        </li>
        <li>
          <a>Get words with similar meanings</a>
        </li>
        <li>
          <a>Get words that rhyme</a>
        </li>
      </ul>
    </>
  )
}

export default Hints;