import { useState } from "react";

export default function Bubble({ id, text, image, left, top, onPop }) {
  const [showText, setShowText] = useState(false);
  const [hasBeenTappedOnce, setHasBeenTappedOnce] = useState(false);

  const handleClick = () => {
    if (!hasBeenTappedOnce) {
      setShowText(true);
      setHasBeenTappedOnce(true);

      // Reset the tap state after 3s
      setTimeout(() => {
        setShowText(false);
        setHasBeenTappedOnce(false);
      }, 3000);
    } else {
      onPop();
    }
  };

  return (
    <div
      className="bubble-wrapper"
      style={{
        left: `${left}%`,
        top: `${top}%`
      }}
      onClick={handleClick}
    >
      <img src={image} className="bubble-img" alt="bubble" />
      {showText && <div className="bubble-text">{text}</div>}
    </div>
  );
}
