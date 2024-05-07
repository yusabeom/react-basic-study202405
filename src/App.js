import { useEffect, useState } from 'react';
import './App.css';
import AddUsers from './components/Users/AddUsers';
import UserList from './components/Users/UserList';
import MainHeader from './components/SideEffect/MainHeader/MainHeader';
import Login from './components/SideEffect/Login/Login';
import Navigation from './components/SideEffect/Navigation/Navigation';
import Home from './components/SideEffect/Home/Home';

const App = () => {
  console.log('App 컴포넌트 실행');
  // 로그인 상태를 관리하는 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 화면이 리렌더링 될 때 LocalStorage 를 확인해서
  // 현재 login-flag가 존재하는지 검사
  console.log('로그인 검사 수행!');

  // 기존에 로그인 한 사람인지 확인하는 코드는
  // 리렌더링 될 때마다 실행하면 안됨! (한 번만 확인하면 됨.)
  useEffect(() => {
    console.log('useEffect 실행! - 최초 단 한번만 실행됨!');
    const storedLoginFlag =
      localStorage.getItem('login-flag');
    if (storedLoginFlag === '1') {
      setIsLoggedIn(true);
    }
  }, []); // 의존성 배열: useEffect가 실행되어야 하는 트리거 변수.
  // 배열 안에 변수를 지정하면, 해당 변수의 값이 변할 때마다 useEffect가 실행됨.
  // 만약 배열을 비워놓으면, 렌더링 과정에서 단 한번만 실행됨.

  // 서버로 로그인을 요청하는 함수, (나중에는 fetch를 통한 백엔드와의 연계가 필요.)
  const loginHandler = (email, password) => {
    // 로그인을 했다는 증거로 상태값 변경 및 브라우저에 로그인 값을 1로 표현해서 저장.
    // (이전 프로젝트에서는 로그인 유지를 session을 사용함 -> 이제는 사용이 불가능.)
    localStorage.setItem('login-flag', '1'); // LocalStorage: 브라우저에서 제공하는 저장소
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('login-flag');
    setIsLoggedIn(false);
  };

  console.log('App컴포넌트의 끝!');
  return (
    <>
      <MainHeader
        isAuthenticated={isLoggedIn}
        onLogout={logoutHandler}
      />
      <main>
        {isLoggedIn && <Home />}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
      </main>
    </>
  );
};

export default App;
