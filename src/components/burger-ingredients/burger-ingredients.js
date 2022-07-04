import React, { useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsCategory from "../ingredients-category/ingredients-category";
import PropTypes from 'prop-types'

const BurgerIngredients = () => {
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
        <IngredientsCategory title={'Булки'} titleId={'bun'}></IngredientsCategory>
        <IngredientsCategory title={'Соусы'} titleId={'sauce'}></IngredientsCategory>
        <IngredientsCategory title={'Начинки'} titleId={'main'}></IngredientsCategory>
      </div>
    </section>
  )
}

// BurgerIngredients.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape(
//     {
//       _id: PropTypes.string,
//       name: PropTypes.string,
//       type: PropTypes.string,
//       proteins: PropTypes.number,
//       fat: PropTypes.number,
//       carbohydrates: PropTypes.number,
//       calories: PropTypes.number,
//       price: PropTypes.number,
//       image: PropTypes.string,
//       image_mobile: PropTypes.string,
//       image_large: PropTypes.string,

//     }
//   )).isRequired,
// }

export default BurgerIngredients;