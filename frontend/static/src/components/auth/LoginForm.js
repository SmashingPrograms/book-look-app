import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import {Button, Form} from 'react-bootstrap';

function LoginForm({ setAccount, setAuth, setProfile, username, setUsername, setSelection }) {

  const [state, setState] = useState({
    username: '',
    password: '',
  })

  // const [password, setPassword] = useState('')
  // useEffect(() => setGame(false), [])

  const handleInput = (event) => {
    console.log('here')
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
      localStorage.setItem('profile', data);
      localStorage.setItem('username', data.username);
      localStorage.setItem('is_superuser', data.is_superuser);
      // setGame(false)
      // setMain(true);
      setSelection('main')
      setUsername(data.username)
      setAuth(true);
      // setAccount(false);
      setProfile(data.profile)
      console.log(data.profile, "Profile after login")
      console.log(data.avatar, "Avatar after login")
      console.log(JSON.stringify(data.profile), "Stringified version")
    };
    // navigate('/');

  }

  return (



    <div className="login">
    <Form onSubmit={handleSubmit}>
      <h1>Login to an existing account</h1> 
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" placeholder="Enter username" onChange={handleInput} value={state.username} required/>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  name="password" placeholder="Enter password" onChange={handleInput} value={state.password} required/>
      </Form.Group>
     

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <button className="btn btn-secondary mx-2" type='button' name='backToLogin' onClick={() => setSelection('register')}>Create a new account</button>
      <button className="btn btn-secondary" type="button" value="registration" onClick={() => setSelection('main')} >Back</button>
    </Form>
    </div>




 
  )
}

export default LoginForm;