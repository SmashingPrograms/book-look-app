import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import Game from './game/game';

function Header({ auth, setAuth, account, setAccount, username }) {

  const handleError = (err) => {
    console.log(err);
  }

  const handleLogout = async event => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }

    const response = await fetch('/rest-auth/logout/', options).catch(
      handleError
    )

    const data = await response.json();
    Cookies.remove('Authorization', `Token ${data.key}`);
    setAuth(false);
    alert("You have been logged out!")
  }

  return (
    <div className="header">
      {
        auth
        ?
        <>
          <span>{username}</span>
          <button type="button" onClick={handleLogout}>Log out</button>
        </>
        :
        <>
          <button type="button" onClick={() => setAccount('l')}>Log in</button>
          <button type="button" onClick={() => setAccount('r')}>Register</button>
        </>
      }
      <hr />
    </div>
  )
}

export default Header;