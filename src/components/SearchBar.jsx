// SearchBar Component
import { DictionaryContext } from "../store/ContextAPI";
import "./styles/searchbar.scss";
import { useContext, useState } from "react";

const SearchBar = () => {
  const { fetchWordData } = useContext(DictionaryContext);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWordData(inputValue);
  };

  return (
    <div className="search">
      <div className="search__container">
        <p className="search__title" title="English Dictionary">
          The DicteN
        </p>
        <p className="search__subtitle">free dictionary</p>
        <div className="search__input-container">
          <input
            className="search__input"
            type="text"
            placeholder="Search"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="search__button" onClick={handleSubmit}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;