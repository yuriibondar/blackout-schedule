import { useEffect, useRef, useState } from "react";
import SearchInputDropdown from "./SearchInputDropdown";
import styles from "./SearchInput.module.css";
import SearchInputError from "./SearchInputError";

const SearchInput = ({ placeholder, value, onSearch, onSelected }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const isExternalValueChange = useRef(false);
  const errorTimeoutRef = useRef(null);

  useEffect(() => {
    isExternalValueChange.current = true;
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    if (isExternalValueChange.current) {
      isExternalValueChange.current = false;
    } else {
      const search = async () => {
        try {
          const result = await onSearch(searchTerm);

          if (result && result.length > 0) {
            setSearchDropdownOpen(true);
            setSearchResult(result);
          } else {
            setSearchDropdownOpen(false);
          }
        } catch (error) {
          setError(`Failed to retrieve results for ${searchTerm}: ${error.message}`);
          clearTimeout(errorTimeoutRef.current);
          errorTimeoutRef.current = setTimeout(() => setError(null), 3000);
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
    }
  }, [searchTerm]);

  const onItemSelected = (id, name) => {
    onSelected(id, name);
    setSearchTerm(name);
    setSearchDropdownOpen(false);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchDropdownOpen && (
        <SearchInputDropdown
          searchResult={searchResult}
          onSelected={onItemSelected}
          onClickOutside={() => {
            setSearchDropdownOpen(false);
          }}
        />
      )}
      {error && <SearchInputError message={error} />}
    </div>
  );
};

export default SearchInput;
