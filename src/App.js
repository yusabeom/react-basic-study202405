import logo from './logo.svg';
import './App.css';
import './NoName.js';
import NoName from './NoName.js';
function App() {

  const $h2 = <h2>반갑습니다~</h2>

  return ( //하나의 태그만 리턴할 수 있음 하나의 부모태그로 감싸야 함! (빈태그 가능)
   <> 
      <NoName />
     <div className='App'> {/* classNmae으로 클래스 부여 */}
        <h1>메롱메롱</h1>
        {$h2}
     </div>
     <div className='noname'>
      <input type='text' />
        <p>
          오늘은 5월 1일 수요일 입니다. <br/> {/* 닫는 태그가 필수 */}
          오후 3시 30분 입니다.
        </p>
     </div>
   </>
  );
}

export default App;
