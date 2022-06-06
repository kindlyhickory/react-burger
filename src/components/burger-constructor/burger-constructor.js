import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from 'prop-types';
import burgerConstructorStyles from "./burger-constructor.module.css";


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
            <ConstructorElement
              key={index}
              text={element.name}
              price={element.price}
              thumbnail={element.image}
            />
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
              const newAcc = acc + ingredient.price;
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
  data: PropTypes.arrayOf(PropTypes.shape(
    {
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,

    }
  )).isRequired,
}

export default BurgerConstructor;