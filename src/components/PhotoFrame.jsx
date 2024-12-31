import { useContext } from "react";
import { DictionaryContext } from "../store/ContextAPI";
import "./styles/photoframe.scss";

const PhotoFrame = ({ image, word }) => {
  const { addFavorite } = useContext(DictionaryContext);

  return (
    <div className="photo-frame">
      <img src={image} alt={word} className="photo-frame__image" />
      <button className="photo-frame__icon" onClick={() => addFavorite(word)}>
        <i className="fa-solid fa-heart"></i>
      </button>
      <p className="photo-frame__caption">#{word}</p>
    </div>
  );
};

export default PhotoFrame;
