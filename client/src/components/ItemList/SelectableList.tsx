type SelectableListProps = {
  items: string[];
  onSelect?: (selectedItem: string) => void;
};

const defaultOnSelect = () => {};

export const SelectableList: React.FC<SelectableListProps> = ({
  items,
  onSelect = defaultOnSelect,
}) => {

  const isSelectable = onSelect !== defaultOnSelect;

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          onClick={() => onSelect(item)}
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            cursor: isSelectable ? "pointer" : "default",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default SelectableList;