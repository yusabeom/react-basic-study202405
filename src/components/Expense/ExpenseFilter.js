import React from 'react';
import './ExpenseFilter.css';

const ExpenseFilter = ({ onChangeFilter }) => {
  const dropdownChangeHandler = (e) => {
    // selected된 year의 값을 Expenses.js에서 사용할 수 있도록 올려보내 보세요.
    const selectedYear = e.target.value;
    onChangeFilter(selectedYear);
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select onChange={dropdownChangeHandler}>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
      </div>
    </div>
  );
};

export default ExpenseFilter;
