import { useState } from 'react';
import Cookies from 'js-cookie';


function RegisterForm(props) {
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
  }

  const handleError = (err) => {
    console.log(err);
  }

  const handleCreateSubmit = async event => {
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
      props.setAuth(true);
      props.setAccount(true);
    }
  }

  const backToLogin = () => {
    props.setAccount(true)
  }

  return (
    <>
      <h1>Create an account</h1>
      <div>
      <form onSubmit={handleCreateSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' id='username' placeholder='username' onChange={handleInput} required value={state.username} />
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' placeholder='email' onChange={handleInput} required value={state.email} />
        <label htmlFor='password1'>Password</label>
        <input type='password' name='password1' id='password1' placeholder='password' onChange={handleInput} required value={state.password1}></input>
        <label htmlFor='password2'>Confirm Password</label>
        <input type='password' name='password2' id='password2' placeholder='password' onChange={handleInput} required value={state.password2}></input>
        <button type='submit'>Login</button>
        <button type='button' name='backToLogin' onClick={backToLogin}>Back</button>
      </form>
      </div>
    </>
  )

}

export default RegisterForm;