import '../App.css';
import {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import Game from './game/game';
import MainPage from './main';
import Header from './header'

function App() {

  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  const [account, setAccount] = useState(false);
  const [game, setGame] = useState(false);
  const [main, setMain] = useState(true)

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

  const conditionalRender = () => {
    console.log("yeah i got here")
    if (main) {
      return <MainPage setMain={setMain} setGame={setGame} />
    } else if (game) {
      return <Game />
    } else if (account) {
      if (account === 'l') {
        return <LoginForm setAuth={setAuth} setAccount={setAccount} setGame={setGame} />
      } else {
        return <RegisterForm setAuth={setAuth} setAccount={setAccount} setGame={setGame} />
      }
    } 
  }

  return (
    <>
      <Header auth={auth} setAuth={setAuth} account={account} setAccount={setAccount} />
      {/* <Game /> */}
      {/* {conditionalRender()} */}
      {conditionalRender()}
      {/* (auth && game) ? <Game /> : <MainPage />} */}
    </>
  );
}

export default App;
