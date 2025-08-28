import { useState } from 'react'
import Chatbot from "../chatbot";
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState("");
        const [counter, setCounter] = useState(0); //store counter in state

        function saveInputText(event) {
          setInputText(event.target.value);
        }
        function sendMessage() {
          if (!inputText.trim()) return;

          const userMessage = {
            message: inputText,
            sender: "user",
            id: counter,
          };
          const newChatMessages = [...chatMessages, userMessage];
          // Update counter for next message
          setCounter(counter + 1);
          // Add user message
          setChatMessages(newChatMessages);

          const response = Chatbot.getResponse(inputText);
          const botMessage = {
            message: response,
            sender: "robot",
            id: counter + 1,
          };

          // Update counter again
          setCounter(counter + 2);
          // Add bot response
          setChatMessages([...newChatMessages, botMessage]);
          setInputText("");
        }
        return (
          <div>
            <div className="chat-input-container">
              <br />
              <input
                placeholder="Send a message to chatbot"
                size="35"
                onChange={saveInputText}
                value={inputText}
                className="chat-input"
              />
              <button onClick={sendMessage} className="send-button">
                Send
              </button>
            </div>
          </div>
        );
      }