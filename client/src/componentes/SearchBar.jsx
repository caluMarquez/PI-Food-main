import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions/actions";
import  "../css/searchBar.css"
const SearchBar = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    function handleChange(e) {    
        e.preventDefault();    
        setInput(e.target.value);
    };

    function handleSubmit(e) {
       
    dispatch(getByName(input));
    setInput('')
        
    };

    return (
        <div className="searchbox">
            <input  className="Input" type="text" placeholder="Search recipe by name" value={input} onChange={e => handleChange(e)}/>
            <button className="Boton" type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}

export default SearchBar;