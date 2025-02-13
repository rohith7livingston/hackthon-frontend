import { useState } from "react";
import { FiSearch, FiPlus, FiBell, FiSettings } from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./../stylesheet/Home.css";

export default function NoteAppUI() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Edit NFT landing page", description: "Here is a big project we are working on right now. Its design style is minimal.", color: "note-bg-orange-dark" },
    { id: 2, title: "Meeting with the team’s guys", color: "note-bg-yellow-light" },
    { id: 3, title: "Edit dribbble shot", date: "2023/02/06", color: "note-bg-orange-dark" },
    { id: 4, title: "Design sprint training", date: "2023/02/05", color: "note-bg-orange-light" },
    { id: 5, title: "Brainstorming for logo design", date: "2023/02/05", color: "note-bg-yellow-dark" },
    { id: 6, title: "Complete design system", details: ["Navigation bars", "Date pickers"], date: "2023/02/04", color: "note-bg-orange-light" },
  ]);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="app-sidebar">
        <div className="app-sidebar-icon"><FaRegStickyNote /></div>
        <div className="app-sidebar-icon"><FiBell /></div>
        <div className="app-sidebar-icon"><FiSettings /></div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="app-header">
          <input className="search-input" type="text" placeholder="Search anything..." />
          <button className="new-note-btn">
            <FiPlus /><Link to='/create-note' className="new-note-link">New Note</Link>
          </button>
        </div>
        
        {/* Notes Grid */}
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className={`note-card ${note.color}`}>
              <h3 className="note-title">{note.title}</h3>
              {note.description && <p className="note-description">{note.description}</p>}
              {note.details && <ul className="note-list">{note.details.map((item, i) => <li key={i}>{item}</li>)}</ul>}
              {note.date && <p className="note-date">{note.date}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}