import { useState } from 'react';

type SelectableListProps = {
  items: string[];
  onSelect?: ((e: React.FormEvent) => void)
};

export const SelectableList: React.FC<SelectableListProps> = ({
  items,
  onSelect,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>();

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          onClick={() => {
            // toggle(item)
            setSelectedItem(item);
            console.log(`Item selected: ${item}`);
          }}
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            cursor: onSelect ? "pointer" : "default",
            backgroundColor: selectedItem === item ? "red" : "blue",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SelectableList;
