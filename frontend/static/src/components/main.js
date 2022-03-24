import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import Game from './game/game';

function MainPage({ setSelection }) {
  return (
    <>
      <div>Welcome to Book-Look!</div>
      <button onClick={() => {
        setSelection('game')
        // setMain(false);
      }}>Play game!</button>
    </>
  )
}

export default MainPage;