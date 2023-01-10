import useOutsideClick from "../hooks/useOutsideClick";
import styles from "./SearchInput.module.css";

const SearchInputDropdown = ({ searchResult, onSelected, onClickOutside }) => {
  const ref = useOutsideClick(onClickOutside);

  return (
    <ul className={styles.dropdown} ref={ref}>
      {searchResult.map((value) => (
        <li
          className={styles.dropdownItem}
          key={value.id}
          onClick={() => onSelected(value.id, value.name)}
        >
          {value.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchInputDropdown;
