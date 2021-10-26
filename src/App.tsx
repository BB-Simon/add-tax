import React, { FC } from 'react';
import './App.css';
import AddTax from './components/AddTax';

const App: FC = () => {
  return (
    <div className="max-w-screen-md mx-auto">
      <AddTax />
    </div>
  );
}

export default App;
