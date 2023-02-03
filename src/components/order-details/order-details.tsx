import React, { FC } from 'react';
import doneImagePath from '../../images/done.svg';
import styles from './order-details.module.css';
import { useSelector } from '../../hooks';

// eslint-disable-next-line react/function-component-definition
const OrderDetails:FC = () => {
  const currentOrder = useSelector((store) => store.order.currentOrder);
  return (
    <div className={`${styles.order} pl-15 pr-15 mt-9 pb-15`}>
      <h3 className="text text_type_digits-large mb-8">{currentOrder.number}</h3>
      <p className="text text_type_main-medium mb-15">
        идентификатор заказа
      </p>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={doneImagePath} className="mb-15" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
