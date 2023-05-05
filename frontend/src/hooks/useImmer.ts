import { useState, useMemo, useRef } from 'react';
import { produce } from 'immer';
import { Draft } from 'immer/dist/internal';

export const useImmer = <T extends {}>(
  initialState: T
): [T, (recipe: (draft: Draft<T>) => void) => void] => {
  const [data, setData] = useState(initialState);
  const refData = useRef(data);
  refData.current = data;
  const changeData = useMemo(() => {
    return (recipe: (draft: Draft<T>) => void) => {
      setData(produce(refData.current, recipe));
    };
  }, []);
  return [data, changeData];
};

export type ChangeState<T extends {}> = (
  recipe: (draft: Draft<T>) => void
) => void;
