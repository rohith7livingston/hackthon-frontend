import React, { useState } from "react";
import { FiMic } from "react-icons/fi";
import "./../stylesheet/CreateNote.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const CreateNote = () => {
  const[Title,settitle] = useState("")
  const [detail, setDetail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // Summarize function
  const handleSummarize = async () => {
    if (detail.length < 20) {
      setError("Please enter at least 20 characters");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_to_summarize: detail }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const summaryResponse = await response.text();
      setDetail(summaryResponse);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Sorry, something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle voice recording
  const toggleListening = () => {
    if (!recognition) {
      alert("Speech Recognition API not supported in your browser");
      return;
    }

    if (!listening) {
      recognition.continuous = true;
      recognition.start();
      setListening(true);

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setDetail((prev) => prev + transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };
    } else {
      recognition.stop();
      setListening(false);
    }
  };
  const handleSave = () =>
  {
    
  }

  return (
    <div>
      <div className="note-creator">
        <br />
        <br />
        <input type="text" placeholder="New Title" className="note-title-input" onChange={(e) => settitle(e.target.value)}/>
        <div className="buttons">
          {/* Voice Recorder Button */}
          <button className={`recorder ${listening ? "recording" : ""}`} onClick={toggleListening}>
            <FiMic size={20} color={listening ? "red" : "#fff"} />
          </button>

          {/* Summarize Button */}
          <button className="summarize" onClick={handleSummarize}>
            AI Summarizer ✨
          </button>
          <button className="save" onClick={handleSave}>Save</button>
        </div>
      </div>
      <br />
      <textarea
        rows={28}
        className="textarea"
        placeholder="Note details..."
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      ></textarea>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
    </div>
  );
};

export default CreateNote;
