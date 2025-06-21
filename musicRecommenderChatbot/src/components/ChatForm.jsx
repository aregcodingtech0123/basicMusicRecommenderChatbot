import React, { useRef, useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();

    if (!userMessage) return;

    setInputValue(""); // clear textarea
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);

    setTimeout(() => {
      setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
      generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    }, 600);

    generateBotResponse([...chatHistory], { role: "user", text: userMessage });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <textarea
        ref={inputRef}
        className="message-input"
        placeholder="Ask anything"
        value={inputValue}
        onChange={handleInputChange}
        rows={1}
        style={{ overflow: "hidden", resize: "none" }}
      />
      <button className="material-symbols-rounded rounded-l-none rounded-r-lg" type="submit">keyboard_arrow_down</button>
    </form>
  );
};

export default ChatForm;


