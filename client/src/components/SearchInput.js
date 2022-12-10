import { useEffect, useState } from "react";
import useOutsideClick from '../hooks/useOutsideClick'
import SearchInputDropdown from "./SearchInputDropdown";

const SearchInput = ({ placeholder, onSearch, onSelected }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  // const ref = useOutsideClick(() => {console.log('callback'); setSearchDropdownOpen(false)});
  useEffect(() => {
    const search = async () => {
      const result = await onSearch(searchTerm);

      if (result && result.length > 0) {
        setSearchDropdownOpen(true);
        setSearchResult(result);
      } else {
        setSearchDropdownOpen(false);
      }
    }

    const timeoutId = setTimeout(() => {
      if(searchTerm) {
        search();
      }
    }, 400)

    return () => {
      clearTimeout(timeoutId);
    }
  }, [searchTerm]);

  const onItemSelected = (id, name) => {
    onSelected(id, name);
    setSearchDropdownOpen(false);
  }

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchDropdownOpen && <SearchInputDropdown searchResult={searchResult} onSelected={onItemSelected} onClickOutside={() => {console.log('callback search'); setSearchDropdownOpen(false)}}/> 
      // (
      //   <ul className="search-dropdown" ref={ref}>
      //     {searchResult.map((value) => (
      //       <li
      //         className="search-dropdown-item"
      //         key={value.id}
      //         onClick={() => onItemSelected(value.id, value.name)}
      //       >
      //         {value.name}
      //       </li>
      //     ))}
      //   </ul>
      // )
      }
    </div>
  );
};

export default SearchInput;
