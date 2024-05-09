import React, { useEffect, useState } from 'react';

// 로그인 상태 변수를 관리할 컨텍스트
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // 함수같은 경우에도 Context에 저장이 가능하다.
  onLogin: (email, password) => {}, // 초기화할 때 함수 내부를 굳이 선언할 필요는 없음.
});

export const AuthContextProvider = ({ children }) => {
  // 로그인 상태를 관리하는 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 화면이 리렌더링 될 때 LocalStorage 를 확인해서
  // 현재 login-flag가 존재하는지 검사
  console.log('로그인 검사 수행!');

  // 기존에 로그인 한 사람인지 확인하는 코드는 리렌더링 때마다 실행하면 안됨!(한번만 확인하면 됨.)
  useEffect(() => {
    console.log('userEffect 실행!- 최초 단 한번만 실행됨!');
    const storedLoginFlag =
      localStorage.getItem('login-flag');
    if (storedLoginFlag === '1') {
      setIsLoggedIn(true);
    }
  }, []);
  // 의존성 배열: useEffect가 실행되어야 하는 트리거 변수.
  // 배열안에 변수를 지정하면, 해당 변수의 값이 변할 때마다 useEffect가 실행됨.
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
