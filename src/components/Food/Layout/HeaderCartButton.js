import React, { useContext, useState } from 'react';
import styles from './HeaderCartButton.module.scss';
import CartIcon from './../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = ({ onShow }) => {
  const { button, icon, badge } = styles;

  const { items } = useContext(CartContext);

  const numberOfCart = items.reduce((accu, item) => {
    return accu + item.amount;
  }, 0);

  return (
    <button className={button} onClick={onShow}>
      <span className={icon}>
        <CartIcon />
      </span>
      <span>나의 장바구니</span>
      <span className={badge}>{items.length}</span>
    </button>
  );
};

export default HeaderCartButton;
