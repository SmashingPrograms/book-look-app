import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from "react-dnd";
import reactStringReplace from 'react-string-replace';
import Choice from './choice';
import Blank from './blank';

function PreviousHints({ hintsTriggered }) {

  console.log(hintsTriggered?.toString.length)
  return (
    <>
      <h2>Hints given:</h2>
      <ul>
        {
        hintsTriggered?.passageBefore
        ?
        <li>
          Previous passage revealed
        </li>
        :
        ''
        }
        {
        hintsTriggered?.passageAfter
        ?
        <li>
          Following passage revealed
        </li>
        :
        ''
        }
      </ul>
    </>
  );
};

export default PreviousHints;