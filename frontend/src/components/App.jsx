import React from 'react';
import { Route, BrowserRouter, Routes, Link, Outlet } from 'react-router-dom';
import SignUpPage from './SignupPage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { Navbar, Nav } from 'react-bootstrap';

const App = () => {
  return (
  <BrowserRouter>
      <Navbar>
        <Nav.Link as={Link} to="/login">Hexlet Chat</Nav.Link>
        <Nav.Link as={Link} to="/signup">Page Two</Nav.Link>
      </Navbar>
    <Routes>
      <Route path='/' element={null} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
    <Outlet />
  </BrowserRouter>)
};

export default App;