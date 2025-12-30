import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import PDFViewer from "../components/PDFViewer";
import samplePdf from "../resources/sample.pdf";
import { IoPaperPlane } from "react-icons/io5";
import { FaUser, FaRobot } from "react-icons/fa";
import TypewriterText from "../components/TypewriterText";

import "../styles/home.css";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  shouldAnimate?: boolean;
}

const BOT_RESPONSES = [
  "That's an interesting perspective! Tell me more.",
  "Novalyze helps manufacturers digitize food safety and quality processes.",
  "Could you clarify what you're looking for specifically?",
  "Our platform unifies environmental monitoring, process control, and sanitation.",
  "I'm here to assist you with any questions about our compliance solutions.",
  "Data silos can really hinder efficiency. We aim to break those down.",
  "Have you checked the latest compliance regulations in your region?",
  "Calibration and verification are key components of our SmartCalibration feature.",
  "That sounds like a great plan.",
  "I can certainly help you navigate through our documentation.",
  "Let's focus on optimization and reducing risks."
];

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "What does Novalyze do?",
      sender: "user",
      shouldAnimate: false,
    },
    {
      id: "2",
      text: "Novalyze streamlines operations with AI-driven solutions, helping businesses overcome data silos and outdated reporting for smarter decisions.",
      sender: "bot",
      shouldAnimate: false,
    },
    {
      id: "3",
      text: "How does it help businesses?",
      sender: "user",
      shouldAnimate: false,
    },
    {
      id: "4",
      text: "It helps them overcome data silos and outdated reporting for smarter decisions. Would you like to know more about a specific feature?",
      sender: "bot",
      shouldAnimate: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      shouldAnimate: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const randomResponse = BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "bot",
        shouldAnimate: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="home-container">
      <Header />
      <div className="home-main-layout">
        <div className="chat-panel">
          <div className="chat-messages-area">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.sender === "user" ? "message-user-row" : "message-bot-row"}
              >
                {msg.sender === "bot" && (
                  <div className="chat-avatar bot-avatar">
                    <FaRobot size={16} />
                  </div>
                )}
                <div
                  className={msg.sender === "user" ? "message-user-bubble" : "message-bot-bubble"}
                >
                  {msg.sender === "bot" ? (
                    <TypewriterText text={msg.text} shouldAnimate={msg.shouldAnimate} />
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
                {msg.sender === "user" && (
                  <div className="chat-avatar user-avatar">
                    <FaUser size={14} />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <div className="chat-input-wrapper">
              <input
                type="text"
                placeholder="Type your message..."
                className="chat-input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="chat-submit-btn" onClick={handleSendMessage}>
                <IoPaperPlane size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="pdf-panel">
          <div className="pdf-panel-inner">
            <PDFViewer file={samplePdf} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
