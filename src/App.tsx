import React from 'react';
import './App.css';
import AuthenticationPage from './page/authenticationPage/AuthenticationPage';
import Navbar from './componets/navbar/Navbar';

function App() {
  return (
    <>
			<Navbar />
			<AuthenticationPage />
    </>
  );
}

export default App;
