import { useEffect, useState } from "react";

const SearchInput = ({placeholder, value, onSearch}) => {
    
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

    return (
        <div className="search-inner">

            <input type="text" placeholder={placeholder} value={value} onChange={onSearch} />
            {searchDropdownOpen && (
        <ul className="menu">
          {/* {streetSearchResult.map((value) => (
            <li className="menu-item" key={value.value}>
              <button>{value.value}</button>
            </li>
          ))}           */}
        </ul>
      )}
        </div>
    );
};

export default SearchInput;