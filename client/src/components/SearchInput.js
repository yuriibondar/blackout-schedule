import { useEffect, useState } from "react";

const SearchInput = (props) => {
    return (
        <input type="text" placeholder={props.placeholder}/>
    );
};

export default SearchInput;