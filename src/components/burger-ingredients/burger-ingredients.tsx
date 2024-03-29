import React, { useEffect, useRef, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsCategory from '../ingredients-category/ingredients-category';

// eslint-disable-next-line react/function-component-definition
const BurgerIngredients:FC = () => {
  const [current, setCurrent] = React.useState('bun');

  const tabRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tabRef.current!.addEventListener('scroll', () => {
      // eslint-disable-next-line max-len
      if ((tabRef.current!.scrollTop > bunRef.current!.offsetTop) && (tabRef.current!.scrollTop < bunRef.current!.offsetTop + bunRef.current!.offsetHeight)) {
        setCurrent('bun');
      }
      // eslint-disable-next-line max-len
      if ((tabRef.current!.scrollTop > mainRef.current!.offsetTop) && (tabRef.current!.scrollTop < mainRef.current!.offsetTop + mainRef.current!.offsetHeight)) {
        setCurrent('main');
      }
      // eslint-disable-next-line max-len
      if ((tabRef.current!.scrollTop > sauceRef.current!.offsetTop) && (tabRef.current!.scrollTop < sauceRef.current!.offsetTop + sauceRef.current!.offsetHeight)) {
        setCurrent('sauce');
      }
    });
  }, []);

  const scroll = (string: string) => {
    setCurrent(string);
    document.getElementById(string)!.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className={`${burgerIngredientsStyles.burgerIngredients} pt-10`}>
      <h2 className={`${burgerIngredientsStyles.title} text text_type_main-large mb-5`}>
        Соберите бургер
      </h2>
      <div className={burgerIngredientsStyles.tabs}>
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
      <div ref={tabRef} className={`${burgerIngredientsStyles.ingredientsCategory}`}>
        <IngredientsCategory ref={bunRef} title="Булки" titleId="bun" />
        <IngredientsCategory ref={sauceRef} title="Соусы" titleId="sauce" />
        <IngredientsCategory ref={mainRef} title="Начинки" titleId="main" />
      </div>
    </section>
  );
};

export default BurgerIngredients;
