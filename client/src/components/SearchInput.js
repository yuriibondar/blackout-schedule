import { useEffect, useState } from "react";
import SearchInputDropdown from "./SearchInputDropdown";

const SearchInput = ({ placeholder, onSearch, onSelected }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  useEffect(() => {
    const search = async () => {
      const result = await onSearch(searchTerm);

      if (result && result.length > 0) {
        setSearchDropdownOpen(true);
        setSearchResult(result);
      } else {
        setSearchDropdownOpen(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        search();
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const onItemSelected = (id, name) => {
    onSelected(id, name);
    setSearchDropdownOpen(false);
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {
        searchDropdownOpen && (
          <SearchInputDropdown
            searchResult={searchResult}
            onSelected={onItemSelected}
            onClickOutside={() => {
              setSearchDropdownOpen(false);
            }}
          />
        )
      }
    </div>
  );
};

export default SearchInput;
