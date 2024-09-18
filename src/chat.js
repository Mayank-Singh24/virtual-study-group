import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

function Chat({ groupName }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Load chat messages in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats', groupName, 'messages'), (snapshot) => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();  // Clean up listener
  }, [groupName]);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      await addDoc(collection(db, 'chats', groupName, 'messages'), {
        text: newMessage,
        timestamp: new Date()
      });
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Chat for {groupName}</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>
      <input 
        type="text" 
        placeholder="Enter message" 
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
