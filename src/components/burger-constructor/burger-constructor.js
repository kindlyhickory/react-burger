import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from 'prop-types';
import burgerConstructorStyles from "./burger-constructor.module.css";
import { ingredientType } from "../../utils.js/types";


const BurgerConstructor = ({ setIsOrderDetailsOpened, data }) => {
  return (
    <div className={`${burgerConstructorStyles.burgerConstructor} mt-25 pl-4 pr-4`}>
      <div className="pl-8">
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data.find(el => {
            return el._id === "60d3b41abdacab0026a733c6"
          }).image}
        />
      </div>
      <div className={`${burgerConstructorStyles.list}`}>
        {
          data.map((element, index) => (
            element.type !== 'bun'
            &&
            <div key={index} className={`${burgerConstructorStyles.element}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />
            </div>
          ))
        }
      </div>
      <div className="pl-8 mb-10">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data.find(el => {
            return el._id === "60d3b41abdacab0026a733c6"
          }).image}
        />
      </div>
      <div className={burgerConstructorStyles.order}>
        <div className={burgerConstructorStyles.price}>
          <p className="text text_type_digits-medium">{
            data.reduce((acc, ingredient) => {
              const newAcc = acc + (ingredient.type !== 'bun' ? ingredient.price : 0);
              return newAcc;
            }, 0)
          }</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={() => setIsOrderDetailsOpened(true)}>
          Нажми на меня
        </Button>
      </div>
    </div>


  )

}
BurgerConstructor.propTypes = {
  setIsOrderDetailsOpened: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(ingredientType).isRequired,
}

export default BurgerConstructor;