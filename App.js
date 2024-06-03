import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import PasswordReset from './components/PasswordReset';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;
