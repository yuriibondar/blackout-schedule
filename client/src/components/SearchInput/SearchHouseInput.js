import voe from "../../api/voe";
import SearchInput from "./SearchInput";

const SearchHouseInput = ({ streetId, value, onSelected }) => {
  const searchHouse = async (term) => {
    const result = await voe.get(`/house/${streetId}`, {
      params: {
        q: term,
      },
    });

    return result && result.data && result.data.map((value) => {
        const parser = new DOMParser();
        const virtualDoc = parser.parseFromString(value.label, "text/html");
        const houseId = virtualDoc
          .getElementsByTagName("div")[0]
          ?.getAttribute("data-id");

        return {id: houseId, name: value.value}
    })
  };

  return (
    <SearchInput placeholder="Будинок" value={value} onSearch={searchHouse} onSelected={onSelected} />
  );
};

export default SearchHouseInput;
