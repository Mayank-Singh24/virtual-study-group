import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Dashboard = () => {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <div className="links">
        <Link to="/study-groups">Study Groups</Link>
        <Link to="/whiteboard">Whiteboard</Link>
        <Link to="/notes">Notes</Link>
      </div>
    </div>
  );
};

export default Dashboard;
