import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  if (!children) {
    return null;
  }
  return (
    <AuthContext.Provider value = {{loggedIn, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;