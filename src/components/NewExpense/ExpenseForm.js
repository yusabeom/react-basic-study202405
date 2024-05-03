import React, { useState } from 'react';
import './ExpenseForm.css';
const ExpenseForm = ({ onSaveExpense, onToggle }) => {
  const [userInput, setUserInput] = useState({
    title: '',
    price: '',
    date: '',
  });

  const titleChangeHandler = (e) => {
    // userInput이 객체 형태이기 때문에 기존값은 유지하면서, 이벤트가 발생한 입력창의 값만
    // 변경하는 로직
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        title: e.target.value,
      };
    });
  };

  const priceChangeHandler = (e) => {
    setUserInput({
      ...userInput,
      price: e.target.value,
    });
  };

  const dateChangeHandler = (e) => {
    setUserInput({
      ...userInput,
      date: e.target.value,
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault(); // submit 차단

    const newExpense = {
      title: userInput.title,
      price: +userInput.price,
      date: new Date(userInput.date),
    };

    onSaveExpense(newExpense); // App.js가 내려준 함수를 호출하면서, 올리고자 하는 데이터를 매개값으로 전달.

    // 입력창 리셋
    setUserInput({
      title: '',
      price: '',
      date: '',
    });
  };

  const cancelInsertHandler = () => onToggle();

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={userInput.title}
          />
        </div>
        <div className="new-expense__control">
          <label>Price</label>
          <input
            type="number"
            min="100"
            step="100"
            onChange={priceChangeHandler}
            value={userInput.price}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2025-12-31"
            onChange={dateChangeHandler}
            value={userInput.date}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={cancelInsertHandler}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
