import '../App.css';
import {useState, useEffect} from "react";
import Cookies from 'js-cookie';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import Game from './game/game';
import MainPage from './main';
import Header from './header'
import BookCRUD from './crud/bookCRUD';

function App() {

  const [auth, setAuth] = useState(!!Cookies.get('Authorization'));
  const [account, setAccount] = useState(false);
  const [selection, setSelection] = useState('main');
  // const [superuser, setSu]
  const [username, setUsername] = useState(auth ? localStorage.getItem('username') : '')
  // const [id, setId] = useState(auth ? localStorage.getItem('id') : 0)
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

  // const conditionalRender = () => {
  //   if (account) {
  //     if (account === 'l') {
  //       return <LoginForm setAuth={setAuth} setAccount={setAccount} setProfile={setProfile} username={username} setUsername={setUsername} />
  //     } else {
  //       return <RegisterForm setAuth={setAuth} setAccount={setAccount} setProfile={setProfile} username={username} setUsername={setUsername} />
  //     }
  //   } 
  //   if (main) {
  //     return <MainPage />
  //   } else if (game) {
  //     return <Game auth={auth} profile={profile} setProfile={setProfile} />
  //   }
  // }

  return (
    <>
      <Header auth={auth} setAuth={setAuth} account={account} setAccount={setAccount} profile={profile} setProfile={setProfile} setUsername={setUsername} username={username} selection={selection} setSelection={setSelection} />

      {selection === 'main' && <MainPage setSelection={setSelection} /> }
      {selection === 'login' && <LoginForm setAuth={setAuth} setAccount={setAccount} setProfile={setProfile} username={username} setUsername={setUsername} setSelection={setSelection} /> }
      {selection === 'register' && <RegisterForm setAuth={setAuth} setAccount={setAccount} setProfile={setProfile} username={username} setUsername={setUsername} setSelection={setSelection} /> }
      {selection === 'game' && <Game auth={auth} profile={profile} setProfile={setProfile} setSelection={setSelection} />}
      {selection === 'bookshelf' && <BookCRUD />}
    </>
  );
}

export default App;
 