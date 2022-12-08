import { useEffect, useState } from "react";

import voe from "../api/voe";

const StreetSearchInput = ({ placeholder, value, onSearch, onSelected }) => {
  const [streetSearchTerm, setStreetSearchTerm] = useState("");
  const [streetSearchResult, setStreetSearchResult] = useState(null);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  useEffect(() => {
    const searchStreet = async (term) => {
      const result = await voe.get("/street/510100000", {
        params: {
          q: term,
        },
      });

      setStreetSearchResult(result.data);
      if (result && result.data && result.data.length > 0) {
        setSearchDropdownOpen(true);
      } else {
        setSearchDropdownOpen(false);
      }
    };
    searchStreet(streetSearchTerm);
  }, [streetSearchTerm]);

  return (
    <div className="search-inner">
      <input
        type="text"
        placeholder="Вулиця"
        value={streetSearchTerm}
        onChange={(e) => setStreetSearchTerm(e.target.value)}
      />
      {searchDropdownOpen && (
        <ul className="menu">
          {streetSearchResult.map((value) => {
            const parser = new DOMParser();
            const virtualDoc = parser.parseFromString(value.label, "text/html");
            const streetId = virtualDoc
              .getElementsByTagName("div")[0]
              ?.getAttribute("data-id");

            return (
              <li
                className="menu-item"
                key={value.value}
                onClick={() => onSelected(streetId, value.value)}
              >
                {value.value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StreetSearchInput;
