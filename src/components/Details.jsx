import { useContext, useState, useEffect } from "react";
import { DictionaryContext } from "../store/ContextAPI";
import "./styles/cards.scss";

const Details = () => {
  const { filterData, error } = useContext(DictionaryContext);
  const [selectedItem, setSelectedItem] = useState("");
  const [view, setView] = useState("definition"); // Tracks the current view
  const [shake, setShake] = useState(false); // State to trigger shake animation

  useEffect(() => {
    if (filterData && filterData.length > 0) {
      setSelectedItem(filterData[0].partOfSpeech);
    }
  }, [filterData]);

  useEffect(() => {
    if (selectedItem || view) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 600); // Matches CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [selectedItem, view]);

  const selectedMeaning = filterData?.find(
    (item) => item.partOfSpeech === selectedItem
  );

  // Access synonyms and antonyms for the selected part of speech
  const synonyms = selectedMeaning?.synonyms || [];
  const antonyms = selectedMeaning?.antonyms || [];

  const uniquePartOfSpeech = [
    ...new Map(filterData?.map((item) => [item.partOfSpeech, item])).values(),
  ];

  return (
    <>
      <nav className="button-nav">
        {!error &&
          uniquePartOfSpeech?.map((item) => (
            <a
              key={item.partOfSpeech}
              href="#"
              className={`nav-link ${
                selectedItem === item.partOfSpeech && view === "definition"
                  ? "active"
                  : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedItem(item.partOfSpeech);
                setView("definition");
              }}
            >
              {item.partOfSpeech}
            </a>
          ))}
       {!error && selectedItem && <a
          href="#"
          className={`nav-link ${view === "table" ? "active" : ""}`}
          onClick={() => setView("table")}
        >
          s & a
        </a>}
      </nav>

      {!error && selectedItem && (
        <section className={`definition-card ${shake ? "shake" : ""}`}>
          {view === "definition" && selectedMeaning && (
            <div className="content">
              <h3 className="definition-title">
                Definition of {selectedMeaning.partOfSpeech}
              </h3>
              {selectedMeaning.definitions.map((definition, index) => (
                <div key={index}>
                  <p className="definition-description">{definition.definition}</p>
                  {definition.example && (
                    <>
                      <h4 className="example-title">Example:</h4>
                      <p className="example-description">{definition.example}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {!error &&view === "table" && (
            <div className="content">
              <h3 className="definition-title">Synonyms & Antonyms Table</h3>
              <table className="synonyms-antonyms-table">
                <thead>
                  <tr>
                    <th>Synonyms</th>
                    <th>Antonyms</th>
                  </tr>
                </thead>
                <tbody>
                  {synonyms.length === 0 && antonyms.length === 0 ? (
                    <tr>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        Not available
                      </td>
                    </tr>
                  ) : (
                    Array.from({
                      length: Math.max(synonyms.length, antonyms.length),
                    }).map((_, i) => (
                      <tr key={i}>
                        <td>{synonyms[i] || "-"}</td>
                        <td>{antonyms[i] || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default Details;
