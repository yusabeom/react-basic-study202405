import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';
import './Expenses.css';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpenseChart from './ExpenseChart';

const Expenses = ({ items }) => {
  // 선택된 연도 상태값 관리
  const [filteredYear, setfilteredYear] = useState(
    new Date().getFullYear().toString(),
  );

  // 자식 컴포넌트 ExpenseFilter에 있는 선택 연도를 끌어올리는 함수.
  const filterChangeHandler = (selectedYear) => {
    console.log('Expenses: ', selectedYear);
    setfilteredYear(selectedYear);
  };

  // ExpenseItem을 동적으로 렌더링하기.
  // const iterateExpenseItem = () => {
  //   // 콜백 함수의 매개값으로 배열의 요소가 하나씩 전달됨.
  //   // 콜백 함수는 배열 요소만큼 반복됨
  //   // map의 리턴값: 함수가 적용된 각 요소가 담긴 새로운 배열이 리턴됨.
  //   return items.map((item) => {
  //     return (
  //       <ExpenseItem title={item.title} price={item.price} date={item.date} />
  //     ); // 리턴값이 하나면 return, 괄호 생략가능
  //   });
  // };

  const filteredItems = items.filter(
    (item) => item.date.getFullYear().toString() === filteredYear,
  );
  console.log(filteredItems);

  // 조건부 렌더링을 위한 변수
  let expenseContent = <p>아직 등록된 지출이 없습니다.</p>;

  if (filteredItems.length > 0) {
    expenseContent = filteredItems.map((item) => (
      <ExpenseItem
        key={item.id}
        title={item.title}
        price={item.price}
        date={item.date}
      />
    ));
  }

  return (
    <Card className="expenses">
      <ExpenseFilter onChangeFilter={filterChangeHandler} />
      <ExpenseChart />
      {expenseContent}
    </Card>
  );
};

export default Expenses;
