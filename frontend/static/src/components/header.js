import Cookies from 'js-cookie';
import { useState, useEffect, useCallback, Profiler } from 'react';
import Game from './game/game';

function Header({ auth, setAuth, account, setAccount, profile, username, setUsername, setProfile, selection, setSelection }) {

  const [avatar, setAvatar] = useState(profile?.avatar);
  const handleError = (err) => {
    console.log(err);
  }
  useEffect(() => setAvatar(profile?.avatar));

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
    localStorage.clear();
    setAuth(false);
    setUsername('');
    setProfile(null);
    localStorage.clear()
    setAvatar('')
    setSelection('main')
  }

  const uploadProfilePic = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    const options = {
      method: 'PATCH',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
    }

    const response = await fetch(`/api/v1/profiles/${profile.id}/`, options)

    const data = await response.json();
    setAvatar(data.avatar);
    console.log(data);
    setProfile(data);
    localStorage.setItem('profile', data);
  }

  return (
    <div className="header">
      {
        auth
        ?
        <>
        {
          profile
          ?
          <>
          <div className="avatar-container"><input type="file" onChange={uploadProfilePic} className="avatar-upload" /><img src={avatar} className="avatar-header" /></div> 
             <span>{username} ({profile.points})</span>
          </>
          :
          ''
        }
        {
          (localStorage.getItem('is_superuser') === 'true') && (selection === 'bookshelf' ? <button type="button" onClick={() => setSelection('main')}>Back</button> : <button type="button" onClick={() => setSelection('bookshelf')}>Bookshelf</button>)
        }
          <button type="button" onClick={handleLogout}>Log out</button>
        </>
        :
        <>
          <button type="button" onClick={() => setSelection('login')}>Log in</button>
          <button type="button" onClick={() => setSelection('register')}>Register</button>
        </>
      }
      <hr />
    </div>
  )
}

export default Header;