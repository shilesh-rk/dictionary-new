import { createContext, useState, useEffect } from "react";

// Context API for Dictionary Data
export const DictionaryContext = createContext();

export const DictionaryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    // Fetch from localStorage on initialization
    return JSON.parse(localStorage.getItem("searchHistory")) || [];
  });
  const [favorites, setFavorites] = useState(() => {
    // Fetch from localStorage on initialization
    return JSON.parse(localStorage.getItem("favHistory")) || [];
  });
  const [wordData, setWordData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const UNSPLASH_ACCESS_KEY = import.meta.env.UNSPLASH_ACCESS_KEY;

  // Update local storage whenever history or favorites change
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("favHistory", JSON.stringify(favorites));
  }, [favorites]);

  // Function to fetch word data
  const fetchWordData = async (searchWord) => {
    setLoading(true);
    setError(null);
    setAlert({ message: "", type: "" }); // Reset alert at the start
  
    try {
      const dictionaryResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
  
      if (!dictionaryResponse.ok) {
        throw new Error("Word not found in the dictionary!");
      }
  
      const dictionaryData = await dictionaryResponse.json();
      setWordData(dictionaryData[0]);
  
      // Filter meanings based on partOfSpeech
      const filteredCategory = dictionaryData[0]?.meanings?.map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions,
        synonyms: meaning.synonyms || [],
        antonyms: meaning.antonyms || [],
      }));
      setFilterData(filteredCategory);
  
      // Fetch image data in a separate try-catch block
      try {
        const imageResponse = await fetch(
          `https://api.unsplash.com/search/photos?query=${searchWord}&client_id=${UNSPLASH_ACCESS_KEY}`
        );
  
        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          setImage(imageData.results[0]?.urls?.regular || null);
        } else {
          throw new Error("No image found for the word!");
        }
      } catch (imageError) {
        setImage(null); // Handle image fetch errors
        setAlert({ message: imageError.message, type: "warning" }); // Alert for image error
      }
  
      // Save searchWord in history with a unique ID
      const newEntry = { id: Date.now(), word: searchWord };
      setHistory((prevHistory) => [...prevHistory, newEntry]);
    } catch (err) {
      setError(err.message);
      setWordData(null);
      setImage(null);
      setAlert({ message: err.message, type: "error" }); // Alert for dictionary error
    } finally {
      setLoading(false);
    }
  };
  

  // Function to remove an item from history
  const removeHistoryItem = (itemId) => {
    const updatedHistory = history.filter((item) => item.id !== itemId);
    setHistory(updatedHistory);
  };

  // Function to remove an item from favorites
  const removeFavorite = (itemId) => {
    const updatedFavorites = favorites.filter((item) => item.id !== itemId);
    setFavorites(updatedFavorites);
  };

  // Function to add a word to favorites
  const addFavorite = (favWord) => {
    if (!favorites.some((fav) => fav.word === favWord)) {
      const newEntry = { id: Date.now(), word: favWord };
      setFavorites((prevFavorites) => [...prevFavorites, newEntry]);
      setAlert({ message: "Added to Favorites!", type: "success" });
    }
  };

  return (
    <DictionaryContext.Provider
      value={{
        history,
        favorites,
        fetchWordData,
        wordData,
        image,
        filterData,
        loading,
        error,
        alert,
        removeHistoryItem,
        removeFavorite,
        addFavorite,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};
