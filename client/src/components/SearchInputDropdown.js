import { useEffect, useState } from "react";
import useOutsideClick from '../hooks/useOutsideClick'

const SearchInputDropdown = ({ searchResult, onSelected, onClickOutside }) => {
  const ref = useOutsideClick(() => {console.log('callback dropdown'); onClickOutside()});

  return (    
        <ul className="search-dropdown" ref={ref}>
          {searchResult.map((value) => (
            <li
              className="search-dropdown-item"
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