import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import Game from './game/game';

function MainPage({ setSelection }) {
  return (

      <div className="main"> 
      <h1>Welcome to Book-Look!</h1>
      <button className="btn btn-success" onClick={() => {
        setSelection('game')
        // setMain(false);
      }}>Play game!</button>
      </div>
   

  )
}

export default MainPage;