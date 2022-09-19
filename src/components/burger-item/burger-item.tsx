import React, { FC, useRef } from 'react';
import { useDrop, useDrag, DropTargetMonitor } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './burger-item.module.css';
import { REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/ingredients';
import { TIngredient } from '../../types';

interface IBurgerItemProps {
  item: TIngredient;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

type TDragItem = {
  index: number
}

// eslint-disable-next-line react/function-component-definition
const BurgerItem:FC<IBurgerItemProps> = ({ item, index, moveItem }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-underscore-dangle
  const id = item._id;
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(el:TDragItem | any, monitor:DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = el.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      el.index = hoverIndex;
    },
  });
  const [{ isDrag }, drag] = useDrag({
    type: 'item',
    item: () => ({ id, index }),
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
          });
        }}
      />
    </div>
  );
};

export default BurgerItem;
