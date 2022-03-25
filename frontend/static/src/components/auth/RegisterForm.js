import { useEffect, useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import Cookies from 'js-cookie';


function RegisterForm({ setAccount, setAuth, setProfile, username, setUsername, setSelection }) {
  // useEffect(() => setGame(false), [])

  const [state, setState] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  })

  const handleInput = (event) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // setUsername(state.username)

  }

  const handleError = (err) => {
    console.log(err);
  }

  const handleSubmit = async event => {
    event.preventDefault();
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(state),
    }

    const response = await fetch('/rest-auth/registration/', options).catch(
      handleError
    )

    if (!response.ok) {
      throw new Error('Network response not ok!');
    } else {
      const data = await response.json();
      Cookies.set('Authorization', `Token ${data.key}`);
      localStorage.setItem('username', data.username);
      // setGame(false);
      // setMain(true);
      setSelection('main')
      setUsername(data.username)
      setAuth(true);
      // setAccount(false);
      // saveProfileData(data.profile, data.username)
      setProfile(data.profile)
      console.log(data.profile)
      // localStorage.setItem('profile', {...data.profile});
      // setGame(true);
    }
  }

  return (
    <div className="registration">
    <Form onSubmit={handleSubmit}>
      <h1>Create an account</h1> 
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text"  name="username" placeholder="Enter username" onChange={handleInput} value={state.username} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email"  name="email" placeholder="Enter email" onChange={handleInput} value={state.email} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"  name="password1" placeholder="Enter password" onChange={handleInput} value={state.password1} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password"  name="password2" placeholder="Confirm password" onChange={handleInput} value={state.password2} required/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <button className="btn btn-secondary mx-2" type='button' name='backToLogin' onClick={() => setSelection('login')}>Log in to existing account</button>
      <button className="btn btn-secondary" type="button" value="registration" onClick={() => setSelection('main')} >Back</button>
    </Form>
    </div>
  )

}

export default RegisterForm;