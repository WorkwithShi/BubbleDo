// BubbleInput.jsx
import { useState } from "react";

export default function BubbleInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText(""); // clear input
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bubble-input">
      <input
        type="text"
        placeholder="What's your task?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add 🫧</button>
    </form>
  );
}
