import React from 'react';
import Login from './components/pages/Login';
import EmployeeView from './components/pages/EmployeeView';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <EmployeeView userId={1}/>
    </div>
  );
}

export default App;
