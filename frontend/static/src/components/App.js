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
  const [id, setId] = useState(auth ? localStorage.getItem('id') : 0)
  const [profile, setProfile] = useState(auth ? JSON.parse(localStorage.getItem('profile')) : null)

  useEffect(() => {
    // localStorage.setItem('id', id)
    localStorage.setItem('profile', JSON.stringify(profile));
  })

  // const getProfile = async () => {
  //   if (auth) {
  //     console.log(profile)
  //     const response = await fetch(`/api/v1/profiles/${id}/`)
  //       // body: JSON.stringify(dataToPush),

  //     const dataToGet = await response.json();

  //     if (!response.ok) {
  //       throw new Error('Network response for profile get request not ok!');
  //     } else {
  //       // console.log(dataToGet)
  //       // Cookies.set('Authorization', `Token ${dataToGet.key}`);
  //       return dataToGet
  //     }
  //   }
  // };

  const conditionalRender = () => {
    if (account) {
      if (account === 'l') {
        return <LoginForm setAuth={setAuth} setAccount={setAccount} setGame={setGame} setProfile={setProfile} username={username} setUsername={setUsername} />
      } else {
        return <RegisterForm setAuth={setAuth} setAccount={setAccount} setGame={setGame} setProfile={setProfile} username={username} setUsername={setUsername} />
      }
    } 
    if (main) {
      return <MainPage setMain={setMain} setGame={setGame} />
    } else if (game) {
      return <Game auth={auth} profile={profile} setProfile={setProfile} />
    }
  }

  return (
    <>
      <Header auth={auth} setAuth={setAuth} account={account} setAccount={setAccount} profile={profile} setProfile={setProfile} setUsername={setUsername} username={username} />
      {/* <Game /> */}
      {/* {conditionalRender()} */}
      {conditionalRender()}
      {/* (auth && game) ? <Game /> : <MainPage />} */}
    </>
  );
}

export default App;
