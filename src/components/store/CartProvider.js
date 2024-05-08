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
    // 신규 아이템 받기
    const newCartItem = action.item;

    // 기존 장바구니에 등록된 메뉴인지 아닌지에 따라 처리를 다르게 해야할 것 같아요.
    // findIndex: 콜백을 통해 배열을 순회하면서 지정한 조건에 맞는 요소의 인덱스를 반환.
    const index = state.items.findIndex(
      // 기존 상태 배열의 id를 하나씩 얻어서 현재 추가하고자 하는 상품의 id와 같은 요소의 인덱스 반환.
      (item) => item.id === newCartItem.id,
    );
    // 기존 카트 아이템
    const existtingItem = [...state.items]; // 기본 배열을 복사.
    const prevCartItem = existtingItem[index]; // 위에서 찾은 인덱스로 요소를 하나만 지목

    let updatedItem;

    if (index === -1) {
      // 신규 아이템
      updatedItem = [...state.items, newCartItem];
    } else {
      //이미 추가가 됐던 아이템 ->  수량을 1 올려주면 됨.(모달안에서만 유효)
      // prevCartItem.amount++; (x) -> 바깥화면에선 상품이 꼭 하나씩만 올라가는것은 아님!
      prevCartItem.amount += newCartItem.amount;
      updatedItem = [...existtingItem]; // 새롭게 복사배열을 갱신.
    }

    const updatedPrice =
      state.totalPrice + newCartItem.price * newCartItem.amount;

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
