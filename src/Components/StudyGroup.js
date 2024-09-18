import React from 'react';
import { Link } from 'react-router-dom';

const StudyGroup = () => {
  return (
    <div className="study-group">
      <h2>Study Group</h2>
      <div className="group-list">
        <Link to="/study-group/1">Group 1</Link>
        <Link to="/study-group/2">Group 2</Link>
      </div>
      <button>Create New Group</button>
    </div>
  );
};

export default StudyGroup;
