import { useState } from 'react';
import './App.css';
import AddUsers from './components/Users/AddUsers';
import UserList from './components/Users/UserList';

const App = () => {
  return (
    <div>
      <AddUsers />
      <UserList />
    </div>
  );
};

export default App;
