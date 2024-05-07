import { useContext, useEffect, useState } from 'react';

import './App.css';
import AddUsers from './components/Users/AddUsers';
import UserList from './components/Users/UserList';
import MainHeader from './components/SideEffect/MainHeader/MainHeader';
import Login from './components/SideEffect/Login/Login';
import Navigation from './components/SideEffect/Navigation/Navigation';
import Home from './components/SideEffect/Home/Home';
import AuthContext from './components/store/auth-context';

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <main>
        {isLoggedIn && <Home />}
        {!isLoggedIn && <Login />}
      </main>
    </>
  );
};

export default App;
