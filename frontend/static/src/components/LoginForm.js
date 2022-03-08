import Cookies from 'js-cookie';
import { useState } from 'react';

function LoginForm(props) {
  const handleError = (error) => {
    console.warn(error);
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      throw new Error('Network response not ok!')
    } else {
      const data = await response.json();
      Cookies.set('Authorization', `Token ${data.key}`);
      props.setAuth(true);
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
        <button type="submit">Login</button>
      </form>
      <button type="button" value="registration" onClick={() => props.setAccount(false)} >Register</button>
    </div>
  )
}

export default LoginForm;