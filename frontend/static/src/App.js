import './App.css';
import {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Game from './components/game';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {

  const [auth, setAuth] = useState(!!Cookies.get('Authorization'))
  const [account, setAccount] = useState(true)

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
  }

  // const testInput = async event => {
  //   event.preventDefault();

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken': Cookies.get('csrftoken'),
  //     },
  //     body: JSON.stringify({signal: "String to reverse now"})
  //   }

  //   const response = await fetch('/api/v1/', options).catch(
  //     handleError
  //   )

  //   // const data = await response.json();
  //   // Cookies.remove('Authorization', `Token ${data.key}`);
  // }

  const homeScreen = (
    <>
      <button name='logOut' type='button' onClick={handleLogout}>Logout</button>
      <Game />
    </>
  )

  return (
    <DndProvider backend={HTML5Backend}>
      {auth ? homeScreen : account ? <LoginForm setAuth={setAuth} setAccount={setAccount} /> : <RegisterForm setAuth={setAuth} setAccount={setAccount} />}
    </DndProvider>
  );
}

export default App;
