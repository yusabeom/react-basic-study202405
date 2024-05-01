import logo from './logo.svg';
import './App.css';
import './NoName.js';
import NoName from './NoName.js';
import ExpenseItem from './components/ExpenseItem.js';
function App() {

  //지출 항목 객체 배열

  const expenses = [
    {
      title: '바나나',
      price: 2000,
      date: new Date(2023, 3, 23),
    },
    {
      title: 'BBQ치킨',
      price: 20000,
      date: new Date(2023, 5, 21),
    },
    {
      title: '도미노피자',
      price: 35000,
      date: new Date(2023, 7, 4),
    },
  ];

  return ( //하나의 태그만 리턴할 수 있음 하나의 부모태그로 감싸야 함! (빈태그 가능)
   <> 
      <ExpenseItem title={expenses[0].title} price={expenses[0].price} date={expenses[0].date}/>
      <ExpenseItem title={expenses[1].title} price={expenses[1].price} date={expenses[1].date} />
      <ExpenseItem title={expenses[2].title} price={expenses[2].price} date={expenses[2].date} />
   </>
  );
}

export default App;
