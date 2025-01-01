import { useContext, useState } from "react";
import "./styles/cards.scss";
import { DictionaryContext } from "../store/ContextAPI";
import PhotoFrame from "./PhotoFrame";

const CardComponent = () => {
  const { wordData, image, loading } = useContext(DictionaryContext);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to handle audio playback
  const playAudio = () => {
    const audioUrl = wordData?.phonetics?.[0]?.audio;

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      setIsPlaying(true);

      // Play the audio and reset the state after playback ends
      audio.play();
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  return (
    <section className="card">
      <div className="text-content">
        {/* Word Display */}
        <h3>
          <strong>Word:</strong> {
          loading?<div className="loader"></div>:wordData?.word?.toUpperCase() || "Enter a word"}
        </h3>
       
        

        {/* Meaning Display */}
        <p>
          <strong>Meaning:</strong>{" "}
          {wordData?.meanings?.[0]?.definitions?.[0]?.definition ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>

        {/* Audio Playback */}
        <div
          className={`audio-trigger ${!wordData?.phonetics?.[0]?.audio ? "disabled" : ""}`}
          onClick={playAudio}
        >
          <i
            className={`fa-solid fa-volume-${isPlaying ? "high" : "mute"}`}
            style={{ color: wordData?.phonetics?.[0]?.audio ? "#FADA7A" : "gray" }}
          ></i>
          <span className="phonetic">
            {wordData?.phonetic || `/₰${wordData?.word || "rēm"}¿/`}
          </span>
        </div>
      </div>

      {/* Image Frame */}
      <PhotoFrame
        image={
          image ||
          "https://thumbs.dreamstime.com/b/seamless-pattern-handwritten-text-lorem-ipsum-vector-brown-old-paper-backdrop-decorative-repeatable-background-196983622.jpg"
        }
        word={wordData?.word || "lorem"}
      />
    </section>
  );
};

export default CardComponent;
