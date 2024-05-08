import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import styles from './Login.module.css';
import Card from '../../UI/Card';
import Button from '../../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../../UI/Input/Input';

// 리듀서 함수 선언
/*
  이 컴포넌트에서 사용하는 모든 상태와 상태 변경을 중앙 제어하는 함수.
  컴포넌트 내부 데이터를 사용하지 않고 상태에만 집중하기 때문에
  컴포넌트 바깥쪽에 선언하는 것이 일반적입니다.

  param1 - state: 변경 전의 상태값
  param2 - action: dispatch함수(상태 변경 등의 행동)가 전달한 상태 변경 객체
  return: 관리할 상태값들을 반환
*/
const emailReducer = (state, action) => {
  // dispatch 함수가 전달한 액션 객체의 타입에 따라 변경할 상태값을 반환
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@'),
    };
  } else if (action.type === 'INPUT_VALIDATE') {
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    };
  }
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
  } else if (action.type === 'INPUT_VALIDATE') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6,
    };
  }
};

const Login = () => {
  const { onLogin } = useContext(AuthContext);
  // email reducer 사용하기
  /*
    param1 - reducer function: 위에서 만든 리듀서 함수
    param2 - initial state: 초기 상태값
    return1 - 이메일 관련 상태변수
    return2 - dispatch함수: 상태를 변경할 수 있는 함수
  */
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [pwState, dispatchPw] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  // 이메일, 패스워드가 둘 다 동시에 정상적인 상태인지 확인
  const [formIsValid, setFormIsValid] = useState(false);

  // 기존의 email 상태변수를 제거함
  // 상태값이 필요하다면 -> reducer에서 제공되는 상태값을 활용
  // emailState에서 isValid 프로퍼티를 디스트럭처링함 (프로퍼티로 바로 사용 X)
  const { isValid: emailIsValid } = emailState;
  const { isValid: pwIsValid } = pwState;

  // 입력란(이메일, 비밀번호)을 모두 체크하여 form의 버튼의 disabled를 해제하는
  // 상태변수 formIsValid의 사이드 이펙트를 처리하는 영역
  useEffect(() => {
    // formIsValid의 유효성 검증을 일부러 1초 뒤에 실행하도록 setTimeout을 사용
    // 1초 이내에 새로운 입력값이 들어옴 -> 상태 변경 -> 재 렌더링이 진행되면서 useEffect가 또 호출됨
    const timer = setTimeout(() => {
      console.log('useEffect called in Login.js!');
      setFormIsValid(emailIsValid && pwIsValid);
    }, 1000);

    // cleanup 함수 - 컴포넌트가 업데이트 되거나 없어지기 직전에 실행
    // 사용자가 1초 이내에 추가 입력 -> 상태 변경 -> 위에 예약한 timer를 취소하자.
    return () => {
      console.log('clean up!');
      clearTimeout(timer);
    };

    // 의존성 배열에 상태변수를 넣어주면 그 상태변수가 바뀔 때마다 useEffect가 재실행됨
  }, [emailIsValid, pwIsValid]);

  const emailChangeHandler = (e) => {
    // reducer의 상태 변경은 dispatch 함수를 통해서 처리
    // dispatch함수의 매개값 객체의 key는 정해진 것이 아닌, reducer 함수에서 구분하기 위해 붙여주는 이름
    // 프로퍼티의 key와 value는 자유롭게 줄 수 있습니다.
    dispatchEmail({
      type: 'USER_INPUT',
      val: e.target.value,
    });
  };

  const passwordChangeHandler = (e) => {
    dispatchPw({
      type: 'USER_INPUT',
      val: e.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'INPUT_VALIDATE',
    });
  };

  const validatePasswordHandler = () => {
    dispatchPw({
      type: 'INPUT_VALIDATE',
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(emailState.value, pwState.value);
  };
  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailIsValid === false ? styles.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <Input
            type={'email'}
            id={'email'}
            label={'E-mail'}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            !pwIsValid ? styles.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            id='password'
            label='Password'
            value={pwState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button
            type='submit'
            className={styles.btn}
            disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
