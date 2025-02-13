import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import './../stylesheet/CollabPage.css';

const socket = io('http://localhost:3001');

const CollabPage = () => {
  const [createNoteId, setCreateNoteId] = useState('');
  const [createPassCode, setCreatePass] = useState('');
  const [joinNoteId, setJoinNoteId] = useState('');
  const [joinPassCode, setJoinPass] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!createNoteId || !createPassCode) {
      alert("Please fill in all fields.");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:3001/collab-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteId: createNoteId,
          passCode: createPassCode,
          title: "New Collaborative Note", 
          detail: "This is a collaborative note.",
          adminEmail: "hai@gadu.com"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Collab note created successfully!");
        navigate(`/collab-editor/${createNoteId}`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error creating collab note:", error);
      alert("Failed to create collab note.");
    }
  };

  const handleJoin = async () => {
    if (!joinNoteId || !joinPassCode) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/collab-join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          noteId: joinNoteId,
          passCode: joinPassCode,
          userEmail: "hai@gadu.com",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Successfully joined the collab note!");
        navigate(`/collab-editor/${joinNoteId}`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error joining collab note:", error);
      alert("Failed to join collab note.");
    }
  };

  return (
    <div>
      <div className='Collab-check'>
        <div className='join'>
          <h1>Create a collab</h1>
          <input type='text' placeholder='NoteId..' className='input-box' value={createNoteId} onChange={(e) => setCreateNoteId(e.target.value)} /><br />
          <input type='text' placeholder='Note PassCode...' className='input-box' value={createPassCode} onChange={(e) => setCreatePass(e.target.value)} /><br />
          <button className='making' onClick={handleCreate} >create</button>
        </div>
        <div className='create'>
          <h1>Join a collab</h1>
          <input type='text' placeholder='NoteId..' className='input-box' value={joinNoteId} onChange={(e) => setJoinNoteId(e.target.value)} /><br />
          <input type='text' placeholder='Note PassCode...' className='input-box' value={joinPassCode} onChange={(e) => setJoinPass(e.target.value)} /><br />
          <button className='making' onClick={handleJoin}>Join</button>
        </div>
      </div>
    </div>
  );
};

export default CollabPage;
