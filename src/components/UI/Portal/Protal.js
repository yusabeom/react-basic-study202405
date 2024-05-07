import React from 'react';
import ReactDOM from 'react-dom';

const Protal = ({ children: renderComponent, destId }) => {
  return ReactDOM.createPortal(
    renderComponent,
    document.getElementById(destId),
  );
};

export default Protal;
