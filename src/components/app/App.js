import React, { useState } from 'react';
import logo from "../../images/logo.svg";
import appStyles from './App.module.css';
import AppHeader from "../app-header/AppHeader"
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import data from '../../utils.js/data';

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader></AppHeader>
      <main className={appStyles.main}>
        <BurgerIngredients data={data}></BurgerIngredients>
        <BurgerConstructor data={data}></BurgerConstructor>
      </main>
    </div>
  );
}

export default App;
