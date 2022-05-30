import React from 'react';
import logo from "../images/logo.svg";
import appStyles from '../styles/App.module.css';
import AppHeader from "./AppHeader"
import BurgerIngredients from './BurgerIngredients';
import BurgerConstructor from './BurgerConstructor';
import data from '../utils.js/data';

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader></AppHeader>
      <main className={appStyles.main}>
        <BurgerIngredients data={data}></BurgerIngredients>
        <BurgerConstructor></BurgerConstructor>
      </main>
    </div>
  );
}

export default App;
