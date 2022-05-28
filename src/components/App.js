import React from 'react';
import logo from "../images/logo.svg";
import appStyles from '../styles/App.module.css';
import AppHeader from "./AppHeader"

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader></AppHeader>
    </div>
  );
}

export default App;
