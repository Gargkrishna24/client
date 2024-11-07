// client/src/App.js
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "fi", name: "Finnish" },
  { code: "el", name: "Greek" },
  { code: "he", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "hu", name: "Hungarian" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "lv", name: "Latvian" },
  { code: "lt", name: "Lithuanian" },
  { code: "ms", name: "Malay" },
  { code: "mt", name: "Maltese" },
  { code: "no", name: "Norwegian" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sr", name: "Serbian" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "sv", name: "Swedish" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "uk", name: "Ukrainian" },
  { code: "vi", name: "Vietnamese" },
];

function App() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es"); // Default language
  const [sourceLanguage, setSourceLanguage] = useState("en");

  useEffect(() => {
    const handleTranslation = (data) => {
      // Callback function inside useEffect
      setTranslatedText(data);
    };

    socket.on("translation", handleTranslation); // Attach listener

    return () => {
      socket.off("translation", handleTranslation); // Clean up on unmount
    };
  }, []);
  // ... (WebSocket connection and event handling - same as before)

  const handleTranslate = () => {
    socket.emit("translate", { text, targetLanguage, sourceLanguage }); // Include source
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Lingualive Translator</h1>
        <p>Your instant translation companion</p>
      </header>
      
      <div className="translation-box">
        <h2>Translate Text</h2>
        <div className="language-selection">
          <div className="language-dropdown">
            <label htmlFor="sourceLanguage">From:</label>
            <select
              id="sourceLanguage"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="language-dropdown">
            <label htmlFor="targetLanguage">To:</label>
            <select
              id="targetLanguage"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          className="text-input"
          placeholder="Enter text to translate..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="translate-button" onClick={handleTranslate}>
          Translate
        </button>
        <div className="translated-text">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      </div>
      
      <footer className="app-footer">
        <p>&copy; 2023 Lingualive. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
