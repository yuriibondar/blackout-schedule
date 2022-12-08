import { useEffect, useState } from "react";

import voe from "../api/voe";
import SearchInput from "./SearchInput";

const StreetSearchInput = ({ placeholder, value, onSearch, onSelected }) => {
  const [streetSearchTerm, setStreetSearchTerm] = useState("");
  const [streetSearchResult, setStreetSearchResult] = useState(null);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchStreet = async (term) => {
    const result = await voe.get("/street/510100000", {
      params: {
        q: term,
      },
    });

    return result && result.data && result.data.map((value) => {
        const parser = new DOMParser();
        const virtualDoc = parser.parseFromString(value.label, "text/html");
        const streetId = virtualDoc
          .getElementsByTagName("div")[0]
          ?.getAttribute("data-id");

        return {id: streetId, name: value.value}
      })
  };

  // useEffect(() => {
  //   const searchStreet = async (term) => {
  //     const result = await voe.get("/street/510100000", {
  //       params: {
  //         q: term,
  //       },
  //     });

  //     if (result && result.data && result.data.length > 0) {        
  //       setSearchDropdownOpen(true);
  //       setStreetSearchResult(result.data.map((value) => {
  //         const parser = new DOMParser();
  //         const virtualDoc = parser.parseFromString(value.label, "text/html");
  //         const streetId = virtualDoc
  //           .getElementsByTagName("div")[0]
  //           ?.getAttribute("data-id");
  
  //         return {id: streetId, name: value.value}
  //       }));
  //     } else {
  //       setSearchDropdownOpen(false);
  //     }
  //   };
  //   searchStreet(streetSearchTerm);
  // }, [streetSearchTerm]);

  return (
    <SearchInput placeholder="Вулиця" onSearch={searchStreet} onSelected={onSelected} />
    // <div className="search-inner">
    //   <input
    //     type="text"
    //     placeholder="Вулиця"
    //     value={streetSearchTerm}
    //     onChange={(e) => setStreetSearchTerm(e.target.value)}
    //   />
    //   {searchDropdownOpen && (
    //     <ul className="menu">
    //       {streetSearchResult.map((value) => (
    //           <li
    //             className="menu-item"
    //             key={value.id}
    //             onClick={() => onSelected(value.id, value.name)}
    //           >
    //             {value.name}
    //           </li>
    //         ))}
    //     </ul>
    //   )}
    // </div>
  );
};

export default StreetSearchInput;
