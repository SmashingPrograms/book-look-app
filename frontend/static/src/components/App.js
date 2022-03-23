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
  const [username, setUsername] = useState(auth ? localStorage.getItem('username') : '')

  useEffect(() => {
    console.log(Cookies.get('Authorization'))
  }, [])

  const conditionalRender = () => {
    if (account) {
      if (account === 'l') {
        return <LoginForm setAuth={setAuth} setAccount={setAccount} setGame={setGame} username={username} setUsername={setUsername} />
      } else {
        return <RegisterForm setAuth={setAuth} setAccount={setAccount} setGame={setGame} username={username} setUsername={setUsername} />
      }
    } 
    if (main) {
      return <MainPage setMain={setMain} setGame={setGame} />
    } else if (game) {
      return <Game />
    }
  }

  return (
    <>
      <Header auth={auth} setAuth={setAuth} account={account} setAccount={setAccount} username={username} />
      {/* <Game /> */}
      {/* {conditionalRender()} */}
      {conditionalRender()}
      {/* (auth && game) ? <Game /> : <MainPage />} */}
    </>
  );
}

export default App;
