import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultState = {
  items: [],
  totalPrice: 0,
};

// 리듀서 함수 정의 : 여러가지 복잡한 상태관리를 중앙 집중화
// state : 업데이트 하기 전의 상태값
// action : 어떤 업데이트를 하는지에 대한 정보와 필요값들이 들어 있음(dispatch 함수에 의해 전달)
const cartReducer = (state, action) => {
  // 상태 변화의 타입이 ADD 라면
  if (action.type === 'ADD') {
    // 기존 상태가 가지고 있는 장바구니 항목에 새로운 항목을 추가
    const updatedItem = [...state.items, action.item];
    console.log(updatedItem);

    const updatedPrice =
      state.totalPrice + action.item.price * action.item.amount;

    // 변경된 상태를 객체 형태로 리턴 -> cartState로 전달됨
    return {
      items: updatedItem,
      totalPrice: updatedPrice,
    };
  } else if (action.type === 'REMOVE') {
    // 지우려고 하는 항목의 id와 일치하지 않는 항목들만 따로 배열로 받아서 리턴 (filter)
    const removedItem = state.items.filter(
      (item) => item.id !== action.id,
    );

    return {
      items: removedItem, // 최신 상태로 상태를 업데이트 -> cartState로 전달됨
    };
  }
};

const CartProvider = ({ children }) => {
  // 리듀서 사용
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultState,
  );

  // Provider의 value는 실제로 관리할 데이터 객체. (consumer들이 사용할 객체를 정의)
  const cartContext = {
    items: cartState.items, // 장바구니에 담긴 항목 배열
    totalPrice: cartState.totalPrice,
    addItem: (item) => {
      // dispatch 함수는 반드시 무슨 액션을 할 것인지, 액션에 필요한 값을 전달
      dispatchCartAction({
        type: 'ADD',
        item,
      });
    },
    removeItem: (id) => {
      dispatchCartAction({
        type: 'REMOVE',
        id,
      });
    },
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
