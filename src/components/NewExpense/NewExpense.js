import React from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = ({ onAddExpense }) => {
  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpense={onAddExpense} />
    </div>
  );
};

export default NewExpense;
