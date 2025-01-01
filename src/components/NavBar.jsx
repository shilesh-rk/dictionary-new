import { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { DictionaryContext } from "../store/ContextAPI";
import Alert from "./Alert";
import "./styles/navbar.scss";

const NavBar = ({ theme, isDarkTheme }) => {
  const { history, favorites, removeFavorite, removeHistoryItem, fetchWordData } =
    useContext(DictionaryContext);
  const [icon, setIcon] = useState(isDarkTheme);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [data, setData] = useState([]);

  const handleTheme = () => {
    theme();
    setIcon(!icon);
  };

  useEffect(() => {
    if (showHistory) {
      setData(history);
    } else if (showFavorites) {
      setData(favorites);
    }
  }, [showHistory, showFavorites, history, favorites]);

  const removeItemFromStorage = (itemId) => {
    if (showHistory) {
      removeHistoryItem(itemId);
    } else if (showFavorites) {
      removeFavorite(itemId);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="rounded bg1" onClick={handleTheme}>
          {icon ? (
            <i className="fa-solid fa-moon" title="dark theme"></i>
          ) : (
            <i className="fa-solid fa-sun" title="light theme"></i>
          )}
        </div>

        <div className="rounded bg2">
          <i className="fa-solid fa-heart heart-icon"></i>
          <div className="buttons-container">
            <button
              onClick={() => {
                setShowHistory(true);
                setShowFavorites(false);
              }}
              style={{
                borderBottom: showHistory && "2px solid #81BFDA",
                color: showHistory && "#FADA7A",
              }}
            >
              History
            </button>
            <button
              onClick={() => {
                setShowFavorites(true);
                setShowHistory(false);
              }}
              style={{
                borderBottom: showFavorites && "2px solid #81BFDA",
                color: showFavorites && "#FADA7A",
              }}
            >
              Favorites
            </button>
          </div>
          <div className="data-container">
            {data?.length > 0 ? (
              <ul className="data-list">
                {data.map((item) => (
                  <li key={item.id}>
                    <span onClick={() => fetchWordData(item.word)}>{item.word}</span>
                    <button
                      className="remove"
                      onClick={() => removeItemFromStorage(item.id)}
                    >
                      <span className="fa-solid fa-times"></span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "red" }}>No data available</p>
            )}
          </div>
        </div>
        <div className="bg-overlay"></div>
        <SearchBar />
      </div>
      <Alert />
    </>
  );
};

export default NavBar;
