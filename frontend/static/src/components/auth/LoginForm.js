import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function LoginForm({ setAccount, setAuth, setGame }, props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => setGame(false), [])

  const handleSubmit = async event => {
    event.preventDefault();

    const user = {
        username,
        password,
    }

    const response = await fetch('/rest-auth/login/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
      // console.log(response.status)
      if (response.status === 400) {
        alert("Incorrect username and/or password")
      } else {
        throw new Error('Network response not ok!');
      };
    } else {
      const data = await response.json();
      Cookies.set('Authorization', `Token ${data.key}`);
      setAuth(true);
      setAccount(false);
      setGame(true);
    };
    // navigate('/');

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
            id='username'
            name='username'
            type='text'
            placeholder='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
            id='password'
            name='password'
            type='password'
            placeholder='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" value="registration" onClick={() => setAccount('r')} >Register</button>
    </div>
  )
}

export default LoginForm;