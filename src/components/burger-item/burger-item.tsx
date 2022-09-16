import React, { FC, useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css"
import { useDispatch } from "react-redux";
import { REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "../../services/actions/ingredients";
import PropTypes from 'prop-types';
import { ingredientType } from "../../utils/types";
import { TIngredient } from "../../types";

interface IBurgerItemProps {
  item: TIngredient;
  index: number;
  moveItem: object;
}

const BurgerItem:FC<IBurgerItemProps> = ({ item, index, moveItem }) => {

  const dispatch = useDispatch()
  const id = item._id;
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(el, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = el.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);

      el.index = hoverIndex;
    },
  });
  const [{ isDrag }, drag] = useDrag({
    type: 'item',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} className={`${styles.item}`} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch({
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            ingredient: item,
          })
        }}
      />
    </div>
  )
}

BurgerItem.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired
}

export default BurgerItem;