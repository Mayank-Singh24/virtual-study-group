// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import StudyGroup from './Components/StudyGroup';
import Whiteboard from './Components/Whiteboard';
import Notes from './Components/Notes';
import VideoChat from './Components/VideoChat';
import './App.css'; // Global styles (optional)

const App = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('auth'); // State to control which component to display

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Virtual Study Group Platform</h1>
          <nav>
            <button onClick={() => setView('auth')}>Authentication</button>
            <button onClick={() => setView('video')}>Video Chat</button>
            <button onClick={() => setView('whiteboard')}>Whiteboard</button>
            <button onClick={() => setView('dashboard')}>Dashboard</button>
            <button onClick={() => setView('study-groups')}>Study Groups</button>
            <button onClick={() => setView('notes')}>Notes</button>
          </nav>
        </header>
        <main>
          {view === 'auth' && (
            <Route path="/login">
              {user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />}
            </Route>
          )}
          {view === 'dashboard' && (
            <Route path="/dashboard">
              {user ? <Dashboard /> : <Navigate to="/login" />}
            </Route>
          )}
          {view === 'study-groups' && (
            <Route path="/study-groups">
              {user ? <StudyGroup /> : <Navigate to="/login" />}
            </Route>
          )}
          {view === 'whiteboard' && (
            <Route path="/whiteboard">
              {user ? <Whiteboard /> : <Navigate to="/login" />}
            </Route>
          )}
          {view === 'notes' && (
            <Route path="/notes">
              {user ? <Notes /> : <Navigate to="/login" />}
            </Route>
          )}
          {view === 'video' && (
            <Route path="/video-chat">
              {user ? <VideoChat /> : <Navigate to="/login" />}
            </Route>
          )}
          {/* Default route */}
          <Route path="/">
            {user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          </Route>
        </main>
      </div>
    </Router>
  );
};

export default App;
