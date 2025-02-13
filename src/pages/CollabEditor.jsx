import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const CollabEditor = () => {
  const { noteId } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.emit('joinNote', noteId);
    
    socket.on('joinedRoom', (noteId) => {
      console.log(`Successfully joined room: ${noteId}`);
    });

    socket.on('noteUpdate', (newContent) => {
      console.log(`Received update: ${newContent}`);
      setContent(newContent);
    });

    return () => {
      socket.off('joinedRoom');
      socket.off('noteUpdate');
    };
  }, [noteId]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    socket.emit('updateNote', { noteId, content: e.target.value });
  };

  return (
    <div>
      <h1>Collaborative Editor</h1>
      <textarea value={content} onChange={handleContentChange} />
    </div>
  );
};

export default CollabEditor;
