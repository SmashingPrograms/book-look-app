import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function LoginForm({ setAccount, setAuth, setProfile, username, setUsername, setGame, setMain }) {

  const [state, setState] = useState({
    username: '',
    password: '',
  })

  // const [password, setPassword] = useState('')
  // useEffect(() => setGame(false), [])

  const handleInput = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // setUsername(state.username);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    // console.log(username)
    // const password = state.password;
    // console.log(password)

    const response = await fetch('/rest-auth/login/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(state),
    });

    if (!response.ok) {
      console.log(response.status)
      if (response.status === 400) {
        alert("Incorrect username and/or password")
      } else {
        throw new Error('Network response not ok!');
      };
    } else {
      const data = await response.json();
      // console.log(response)
      Cookies.set('Authorization', `Token ${data.key}`);
      console.log(data)
      console.log(data.username)

      localStorage.setItem('username', data.username)
      setGame(false)
      setMain(true);
      setUsername(data.username)
      setAuth(true);
      setAccount(false);
      setProfile(data.profile)
      console.log(data.profile, "Profile after login")
      console.log(JSON.stringify(data.profile), "Stringified version")
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
            value={state.username}
            onChange={handleInput}
        />
        <label htmlFor='password'>Password</label>
        <input
            id='password'
            name='password'
            type='password'
            placeholder='password'
            required
            value={state.password}
            onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" value="registration" onClick={() => setAccount('r')} >Create a new account</button>
      <button type="button" value="registration" onClick={() => setAccount('')} >Back</button>
    </div>
  )
}

export default LoginForm;