import React, { useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsCategory from "../ingredients-category/ingredients-category";
import PropTypes from 'prop-types'
import { ingredientType } from "../../utils.js/types";

const BurgerIngredients = ({ setIsIngredientDetailOpened, data }) => {
  const [current, setCurrent] = React.useState('bun');

  const bunRef = useRef(null)
  const sauceRef = useRef(null)
  const mainRef = useRef(null)

  const scroll = (ref) => {
    setCurrent(ref.id)
    ref.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <section className={`${burgerIngredientsStyles.burgerIngredients} pt-10`}>
      <h2 className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}>
        Соберите бургер
      </h2>
      <div className={burgerIngredientsStyles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={() => scroll(bunRef.current)}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={() => scroll(sauceRef.current)}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={() => scroll(mainRef.current)}>
          Начинки
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.ingredientsCategory}`}>
        <IngredientsCategory titleRef={bunRef} setIsIngredientDetailOpened={setIsIngredientDetailOpened} title={'Булки'} titleId={'bun'} ingredients={data.filter(element => element.type === "bun")}></IngredientsCategory>
        <IngredientsCategory titleRef={sauceRef} setIsIngredientDetailOpened={setIsIngredientDetailOpened} title={'Соусы'} titleId={'sauce'} ingredients={data.filter(element => element.type === "sauce")}></IngredientsCategory>
        <IngredientsCategory titleRef={mainRef} setIsIngredientDetailOpened={setIsIngredientDetailOpened} title={'Начинки'} titleId={'main'} ingredients={data.filter(element => element.type === "main")}></IngredientsCategory>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  setIsIngredientDetailOpened: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(ingredientType).isRequired,
}

export default BurgerIngredients;