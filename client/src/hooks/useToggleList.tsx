import { useState } from 'react';

function useToggleList<T>(initial: T[] = []) {
  const [items, setItems] = useState<T[]>(initial);

  const toggle = (item: T) => {
    setItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const has = (item: T) => items.includes(item);

  return { items, setItems, toggle, has };
}

export default useToggleList;
