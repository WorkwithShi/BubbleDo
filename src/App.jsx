import { useState, useEffect } from "react";
import BubbleInput from "./BubbleInput";
import Bubble from "./Bubble";
import "./App.css";

function App() {
  // Load from localStorage when the app starts
  const [bubbles, setBubbles] = useState(() => {
    const saved = localStorage.getItem("bubbledoTasks");
    return saved ? JSON.parse(saved) : [];
  });

  const addBubble = (text) => {
    const randomIndex = Math.floor(Math.random() * 9) + 1;
    const randomLeft = Math.floor(Math.random() * 80) + 5;
    const randomTop = Math.floor(Math.random() * 75) + 5;

    const newBubble = {
      id: Date.now(),
      text,
      image: process.env.PUBLIC_URL + `/assets/b${randomIndex}.png`,
      left: randomLeft,
      top: randomTop,
    };
    setBubbles((prev) => [...prev, newBubble]);    
  };

  const removeBubble = (id) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  // Save to localStorage whenever bubbles change
  useEffect(() => {
    localStorage.setItem("bubbledoTasks", JSON.stringify(bubbles));
  }, [bubbles]);

  useEffect(() => {
    for (let i = 1; i <= 6; i++) {
      new Audio(`/sounds/pop${i}.mp3`);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isKeyboardOpen =
        window.innerHeight > window.visualViewport.height + 100;
      document.body.classList.toggle("keyboard-open", isKeyboardOpen);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="app">
      <img src="assets/BubbleDoT.png" alt="BubbleDo Logo" className="logo" />

      {bubbles.map((b) => (
        <Bubble
          key={b.id}
          id={b.id}
          text={b.text}
          image={b.image}
          left={b.left}
          top={b.top}
          onPop={() => {
            const randomIndex = Math.floor(Math.random() * 6) + 1;
            const audio = new Audio(`/sounds/pop${randomIndex}.mp3`);
            audio.play();
            removeBubble(b.id);
          }}
        />
      ))}
      <BubbleInput onAdd={addBubble} />
    </div>
  );
}

export default App;
