<<<<<<< HEAD
import React, { createRef, useEffect, useRef, useCallback } from "react";
=======
import React, { useEffect, useRef } from "react";
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsCategory from "../ingredients-category/ingredients-category";
import PropTypes from 'prop-types'
import { ingredientType } from "../../utils.js/types";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');

<<<<<<< HEAD
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
=======
  const bunRef = useRef(null)
  const sauceRef = useRef(null)
  const mainRef = useRef(null)

  const scroll = (ref) => {
    setCurrent(ref.id)
    ref.scrollIntoView({
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
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
<<<<<<< HEAD
      <div ref={tabRef} className={`${burgerIngredientsStyles.ingredientsCategory}`}>
        <IngredientsCategory ref={bunRef} title={'Булки'} titleId={'bun'}></IngredientsCategory>
        <IngredientsCategory ref={sauceRef} title={'Соусы'} titleId={'sauce'}></IngredientsCategory>
        <IngredientsCategory ref={mainRef} title={'Начинки'} titleId={'main'}></IngredientsCategory>
=======
      <div className={`${burgerIngredientsStyles.ingredientsCategory}`}>
        <IngredientsCategory titleRef={bunRef} setIsIngredientDetailOpened={setIsIngredientDetailOpened} title={'Булки'} titleId={'bun'} ingredients={data.filter(element => element.type === "bun")}></IngredientsCategory>
        <IngredientsCategory titleRef={sauceRef} setIsIngredientDetailOpened={setIsIngredientDetailOpened} title={'Соусы'} titleId={'sauce'} ingredients={data.filter(element => element.type === "sauce")}></IngredientsCategory>
        <IngredientsCategory titleRef={mainRef} setIsIngredientDetailOpened={setIsIngredientDetailOpened} title={'Начинки'} titleId={'main'} ingredients={data.filter(element => element.type === "main")}></IngredientsCategory>
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5
      </div>
    </section>
  )
}

<<<<<<< HEAD
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
=======
BurgerIngredients.propTypes = {
  setIsIngredientDetailOpened: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(ingredientType).isRequired,
}
>>>>>>> 634b4f7a1918e89bf4b01e247a7066ecde835ff5

export default BurgerIngredients;