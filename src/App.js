import { useState } from 'react';
import './App.css';

import Expenses from './components/Expense/Expenses.js';
import NewExpense from './components/NewExpense/NewExpense.js';

function App() {
  //지출 항목 객체 배열

  const expenses = [
    {
      id: 1,
      title: '바나나',
      price: 2000,
      date: new Date(2023, 3 - 1, 23),
    },
    {
      id: 2,
      title: 'BBQ치킨',
      price: 20000,
      date: new Date(2023, 5 - 1, 21),
    },
    {
      id: 3,
      title: '도미노피자',
      price: 35000,
      date: new Date(2023, 7 - 1, 4),
    },
    {
      id: 4,
      title: '엽기떡볶이',
      price: 18000,
      date: new Date(2024, 6 - 1, 1),
    },
  ];

  // 지출 객체배열을 상태변수로 관리
  const [expenseList, setExpenseList] = useState(expenses);

  // ExpenseForm 에게 내려보낼 함수
  const addExpenseHandler = (newExpense) => {
    console.log('App 컴포넌트에서 응답함!');
    console.log('newExpense: ', newExpense);

    const modifyExpense = {
      ...newExpense,
      id: expenseList[expenseList.length - 1].id + 1,
    };
    console.log(modifyExpense);

    setExpenseList([...expenseList, modifyExpense]); // 기존 배열을 살리면서 뒤에 생성
  };

  return (
    //하나의 태그만 리턴할 수 있음 하나의 부모태그로 감싸야 함! (빈태그 가능)
    <>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenseList} />
    </>
  );
}

export default App;
