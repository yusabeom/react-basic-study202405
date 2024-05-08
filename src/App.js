import React, { useState } from 'react';
import './App.css';

import Header from './components/Food/Layout/Header';
import Meals from './components/Food/Meals/Meals';
import Cart from './components/Food/Cart/Cart';
import CartProvider from './components/store/CartProvider';
import CartModal from './components/UI/Modal/CartModal';

const App = () => {
  // 장바구니 모달의 공개 여부 상태 변수
  const [cartIsShown, setCartIsShown] = useState(false);

  // 모달을 열어주는 핸들러
  const showCartHandler = () => setCartIsShown(true);

  // 모달을 닫아주는 핸들러
  const hideCartHandler = () => setCartIsShown(false);

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <div id='main'>
        <Meals />
      </div>
    </CartProvider>
  );
};

export default App;
