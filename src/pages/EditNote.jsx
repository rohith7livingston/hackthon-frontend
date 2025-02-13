import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './../stylesheet/EditNote.css'


const EditNote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note } = location.state || {};

  const [title, setTitle] = useState(note?.title || "");
  const [detail, setDetail] = useState(note?.detail || "");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (!title || !detail) {
      setError("Title and content are required!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/update-note/${note._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, detail }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      navigate("/home"); // Redirect to home page after update
    } catch (error) {
      console.error("Error updating note:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="edit-note-container">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Title"
      />
      <textarea
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder="Note details..."
      />
      {error && <p className="error-message">{error}</p>}
  
      <div className="edit-note-buttons">
        <button className="mic-button">🎤</button>
        <button className="summarizer-button">AI Summarizer ✨</button>
        <button className="save-button" onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
  
};

export default EditNote;
