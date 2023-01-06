import voe from "../api/voe";
import SearchInput from "./SearchInput";

const SearchStreetInput = ({ value, onSelected }) => {
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

  return (
    <SearchInput placeholder="Вулиця" value={value} onSearch={searchStreet} onSelected={onSelected} />
  );
};

export default SearchStreetInput;
