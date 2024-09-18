import React, { useState } from 'react';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    const newNote = prompt("Enter note:");
    if (newNote) {
      setNotes([...notes, newNote]);
    }
  };

  return (
    <div className="notes">
      <h2>Notes</h2>
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
