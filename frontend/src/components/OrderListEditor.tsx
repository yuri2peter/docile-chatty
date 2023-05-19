/* eslint-disable @typescript-eslint/no-explicit-any */
// 可拖拽排序数组数据编辑器
import React, { useCallback } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DraggingStyle,
  NotDraggingStyle,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { Stack } from '@mui/material';
import produce, { Immutable } from 'immer';
import ReactDOM from 'react-dom';

export type ItemRenderProps<T> = {
  isDragging: boolean;
  item: T;
  index: number;
  dragItemProps: any;
  dragHandleProps: any;
  handleDelete: () => void;
  handleChangeItem: (cb: (d: T) => void) => void;
  handleChangeItems: (cb: (d: Array<T>) => void) => void;
};

interface Props<T> {
  value: Array<T>;
  onChange: (value: Array<T>) => void;
  itemRender: (data: ItemRenderProps<T>) => React.ReactElement;
  itemSpacing?: number | string;
  onCreate?: null | (() => void);
  disableDelete?: boolean;
  showIndex?: boolean;
}

const OrderListEditor = <T extends unknown>({
  value,
  onChange,
  itemRender,
  itemSpacing = 0,
}: Props<T>): React.ReactElement => {
  const changeValue = useCallback(
    (cb: (d: Array<T>) => void) => {
      onChange(produce(cb)(value as Immutable<T[]>));
    },
    [onChange, value]
  );
  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const orderList = reorderList(
        value,
        result.source.index,
        result.destination?.index || 0
      );
      onChange(orderList);
    },
    [value, onChange]
  );
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="A" direction="vertical">
          {(provided) => {
            return (
              <Stack
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={itemSpacing}
                sx={{ paddingY: itemSpacing }}
              >
                {value.map((t, i) => (
                  <Draggable draggableId={`${i}`} index={i} key={i}>
                    {(provided, snapshot) => {
                      const dragItemProps = {
                        key: i,
                        ref: provided.innerRef,
                        ...provided.draggableProps,
                        style: {
                          ...getItemStyle(provided.draggableProps.style),
                        },
                      };
                      const dragHandleProps = provided.dragHandleProps;
                      const handleDelete = () => {
                        changeValue((d) => {
                          d.splice(i, 1);
                        });
                      };
                      const handleChangeItems = changeValue;
                      const handleChangeItem = (cb: (d: T) => void) => {
                        changeValue((d) => {
                          const item = d[i];
                          cb(item);
                        });
                      };
                      return (
                        <MyDraggableItemRender isDragging={snapshot.isDragging}>
                          {itemRender({
                            item: t,
                            index: i,
                            dragItemProps,
                            dragHandleProps,
                            handleDelete,
                            handleChangeItems,
                            handleChangeItem,
                            isDragging: snapshot.isDragging,
                          })}
                        </MyDraggableItemRender>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Stack>
            );
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default OrderListEditor;

// 排序
function reorderList<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  ...draggableStyle,
  userSelect: 'none',
});

const MyDraggableItemRender: React.FC<{
  children: React.ReactElement;
  isDragging: boolean;
}> = ({ children, isDragging }) => {
  const portal = document.body;
  if (isDragging) {
    return ReactDOM.createPortal(children, portal);
  }
  return children;
};
