import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import Game from './game/game';

function MainPage({ setMain, setGame }) {
  return (
    <>
      <div>Welcome to Book-Look!</div>
      <button onClick={() => {
        setGame(true);
        setMain(false);
      }}>Play game!</button>
    </>
  )
}

export default MainPage;