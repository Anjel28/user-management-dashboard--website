import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './Components/UserList';
import Navbar from './Components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<UserList />} />

            
          </Routes>
        </div>
      </div>
    </Router>
  );

}

export default App;
