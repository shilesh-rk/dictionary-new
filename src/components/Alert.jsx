import { useContext, useEffect, useState } from "react";
import { DictionaryContext } from "../store/ContextAPI";
import "../components/styles/alert.scss";

const Alert = () => {
  const { alert } = useContext(DictionaryContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alert.message) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000); // Show alert for 3 seconds
    }
  }, [alert]); // Re-run the effect when alert changes

  return (
    <div className={`alert ${show && alert.type}`}>
      <span className="alertText">
        {show && alert.message}
      </span>
    </div>
  );
};

export default Alert;
