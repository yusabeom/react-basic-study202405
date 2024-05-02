import React from 'react'
import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';

const ExpenseItem = ({title, price, date}) => {

    // 한자리 수를 두자리로 변환해주는 함수
    const make2digit = (text) => {
        return text.toString().padStart(2, '0');
        // padStart는 앞자리 변수보다 작다면 앞에서부터 '0'을 채우고 
        // padEnd는 뒷자리부터 '0'을 채운다
    }

    // 날짜 포맷팅 변환 함수 정의
    const makeFormattedDate = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        return `${year}년 ${make2digit(month)}월 ${make2digit(day)}일`;
    }

    // 숫자를 화폐 표기법으로 바꾸기
    const formattedPirce = new Intl.NumberFormat('ko-KR',{ style: 'currency', currency: 'KRW' }).format(price)

  return (
    <div className='expense-item'>
      <ExpenseDate date={date}/>
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>{formattedPirce}원</div>
      </div>
    </div>
  )
}

export default ExpenseItem