import React from 'react';
import styles from './ErrorModal.module.css';
import Card from '../Card';
import Button from '../Button/Button';
import ReactDOM from 'react-dom';

const Backdrop = ({ onConfirm }) => {
  return <div className={styles.backdrop} onClick={onConfirm} />;
};

const ModalOverlay = ({ title, message, onConfirm }) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{title}</h2>
      </header>
      <div className={styles.content}>
        <p>{message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

// Modal을 사용하는 쪽에서 모달 제목과 메세지가 props로 전달될 것이다.
// onConfirm -> AddUsers쪽에서 상태관리하고 있는 모달 노출 여부를 제어하는 함수.

const ErrorModal = ({ title, message, onConfirm }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={onConfirm} />,
        document.getElementById('backdrop-root'),
      )}

      {ReactDOM.createPortal(
        <ModalOverlay title={title} message={message} onConfirm={onConfirm} />,
        document.getElementById('overlay-root'),
      )}
    </>
  );
};

export default ErrorModal;
