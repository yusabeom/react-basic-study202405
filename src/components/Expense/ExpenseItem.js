import React, { useState } from 'react';
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const ExpenseItem = ({ title, price, date }) => {
  // 한자리 수를 두자리로 변환해주는 함수
  const make2digit = (text) => {
    return text.toString().padStart(2, '0');
    // padStart는 앞자리 변수보다 작다면 앞에서부터 '0'을 채우고
    // padEnd는 뒷자리부터 '0'을 채운다
  };

  // 날짜 포맷팅 변환 함수 정의
  const makeFormattedDate = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}년 ${make2digit(month)}월 ${make2digit(day)}일`;
  };

  // 숫자를 화폐 표기법으로 바꾸기
  const formattedPirce = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(price);

  // 값이 변경되어 화면에 반영되어야 하는 값들은
  // useState 훅을 통해 상태변수로 관리해야 한다.
  // (훅: React에서 직접 코드 작성 없이 다양한 기능을 사용할 수 있게 도와주는 라이브러리)
  // 초기값은 ''또는 0도 가능

  // useState(상태변수의 초기값) -> 배열을 리턴합니다.
  // 첫번째 요소는 관리할 상태값
  // 두번째 요소는 상태값을 변경하는 setter 함수가 리턴됨
  const [itemTitle, setItemTitle] = useState(title);

  const clickHandler = (e) => {
    // state로 관리하는 변수는 반드시 setter 로만 변경해야 합니다.

    setItemTitle((snapshot) => {
      console.log('snapshot: ', snapshot);
      // setter함수의 매개값으로 콜백 함수를 선언. -> 콜백 함수의 매개값으로 현재 상태변수 값이 전달.
      // return값이 변경될 상태값으로 지정.
      // return값이 snapshot과 다를 경우에 화면이 리렌더링, 같을 경우 리렌더링 하지 않음.
      return '메롱메롱~';
    });
    // setItemTitle('메롱메롱');
  };

  return (
    <Card className="circle">
      <div className="expense-item">
        <ExpenseDate date={date} />
        <div className="expense-item__description">
          <h2>{itemTitle}</h2>
          <div className="expense-item__price">{formattedPirce}원</div>
        </div>
      </div>
      <button id="btn1" onClick={clickHandler}>
        수정
      </button>
      <button
        id="btn2"
        onClick={(e) => {
          console.log('삭제 버튼 클릭됨!');
        }}
      >
        삭제
      </button>
    </Card>
  );
};

export default ExpenseItem;
