import React, { createRef, useEffect, useRef, useCallback } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsCategory from "../ingredients-category/ingredients-category";
import PropTypes from 'prop-types'
import { ingredientType } from "../../utils.js/types";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');

  const tabRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);


  useEffect(() => {
    tabRef.current.addEventListener('scroll', () => {

      if ((tabRef.current.scrollTop > bunRef.current.offsetTop) && (tabRef.current.scrollTop < bunRef.current.offsetTop + bunRef.current.offsetHeight)) {
        setCurrent('bun');
      }
      if ((tabRef.current.scrollTop > mainRef.current.offsetTop) && (tabRef.current.scrollTop < mainRef.current.offsetTop + mainRef.current.offsetHeight)) {
        setCurrent('main');
      }
      if ((tabRef.current.scrollTop > sauceRef.current.offsetTop) && (tabRef.current.scrollTop < sauceRef.current.offsetTop + sauceRef.current.offsetHeight)) {
        setCurrent('sauce');
      }
    })

  }, [])


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
      <div ref={tabRef} className={`${burgerIngredientsStyles.ingredientsCategory}`}>
        <IngredientsCategory ref={bunRef} title={'Булки'} titleId={'bun'}></IngredientsCategory>
        <IngredientsCategory ref={sauceRef} title={'Соусы'} titleId={'sauce'}></IngredientsCategory>
        <IngredientsCategory ref={mainRef} title={'Начинки'} titleId={'main'}></IngredientsCategory>
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