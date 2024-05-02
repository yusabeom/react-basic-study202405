import './App.css';

import Expenses from './components/Expense/Expenses.js';
import NewExpense from './components/NewExpense/NewExpense.js';

function App() {
  //지출 항목 객체 배열

  const expenses = [
    {
      title: '바나나',
      price: 2000,
      date: new Date(2023, 3 - 1, 23),
    },
    {
      title: 'BBQ치킨',
      price: 20000,
      date: new Date(2023, 5 - 1, 21),
    },
    {
      title: '도미노피자',
      price: 35000,
      date: new Date(2023, 7 - 1, 4),
    },
  ];

  return (
    //하나의 태그만 리턴할 수 있음 하나의 부모태그로 감싸야 함! (빈태그 가능)
    <>
      <NewExpense />
      <Expenses items={expenses} />
    </>
  );
}

export default App;
