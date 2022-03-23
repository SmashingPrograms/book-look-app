import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


function RegisterForm({ setAccount, setAuth, setProfile, username, setUsername }) {
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
      setUsername(data.username)
      setAuth(true);
      setAccount(false);
      // saveProfileData(data.profile, data.username)
      setProfile(data.profile)
      // setGame(true);
    }
  }

  return (
    <>
      <h1>Create an account</h1>
      <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' placeholder='username' onChange={handleInput} required value={state.username} />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' placeholder='email' onChange={handleInput} required value={state.email} />
        <label htmlFor='password1'>Password</label>
        <input type='password' name='password1' id='password1' placeholder='password' onChange={handleInput} required value={state.password1}></input>
        <label htmlFor='password2'>Confirm password</label>
        <input type='password' name='password2' id='password2' placeholder='password' onChange={handleInput} required value={state.password2}></input>
        <button type='submit'>Submit</button>
        <button type='button' name='backToLogin' onClick={() => setAccount('l')}>Log in to existing account</button>
        <button type="button" value="registration" onClick={() => setAccount('')} >Back</button>
      </form>
      </div>
    </>
  )

}

export default RegisterForm;