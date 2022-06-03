import React, { useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsCategory from "../ingredients-category/IngredientsCategory";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState('bun');

  const scroll = (string) => {
    setCurrent(string);
    document.getElementById(string).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <section className={`${burgerIngredientsStyles.burgerIngredients} pt-10`}>
      <h2 className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}>
        Соберите бургер
      </h2>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={scroll}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={scroll}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={scroll}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.ingredientsCategory}`}>
        <IngredientsCategory title={'Булки'} titleId={'bun'} ingredients={data.filter(element => element.type === "bun")}></IngredientsCategory>
        <IngredientsCategory title={'Соусы'} titleId={'sauce'} ingredients={data.filter(element => element.type === "sauce")}></IngredientsCategory>
        <IngredientsCategory title={'Начинки'} titleId={'main'} ingredients={data.filter(element => element.type === "main")}></IngredientsCategory>
      </div>
    </section>
  )
}

export default BurgerIngredients;