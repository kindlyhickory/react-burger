import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from '../styles/BurgerIngredients.module.css';
import IngredientsCategory from "./IngredientsCategory";

const BurgerIngredients = ({data}) => {
  const [current, setCurrent] = React.useState('one')
  return (
    <div className={`${burgerIngredientsStyles.burgerIngredients} pt-10`}>
      <h2 className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}>
        Соберите бургер
      </h2>
      <div style={{ display: 'flex' }}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                One
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Two
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Three
            </Tab>
        </div>
      <IngredientsCategory></IngredientsCategory>
    </div>
  )
}

export default BurgerIngredients;