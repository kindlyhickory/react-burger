import React, { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css"

const BurgerItem = ({ item, index, moveItem }) => {
  const id = item._id;
  const ref = useRef(null);
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

export default BurgerItem;