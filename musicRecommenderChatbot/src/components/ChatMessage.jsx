import React from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  const renderMessageText = (text) => {
    const lines = text.split('\n');
    const hasListItems = lines.some(line => line.trim().startsWith('*'));

    if (hasListItems) {
      return (
        <ul>
          {lines.map((line, index) => {
            if (line.trim().startsWith('*')) {
              return <li key={index}>{line.replace(/^\*\s*/, '')}</li>;
            } else if (line.trim() !== '') {
              return <p key={index}>{line}</p>;
            } else {
              return null;
            }
          })}
        </ul>
      );
    }

    return <p>{text}</p>;
  };

  return (
    <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
      {chat.role === "model" && <ChatbotIcon />}
      <div className="message-text">
        {renderMessageText(chat.text)}
      </div>
    </div>
  );
};

export default ChatMessage;
