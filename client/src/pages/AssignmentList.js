import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAssignments } from '../utils/api';

const AssignmentCard = ({ assignment, onClick }) => {
  const getDifficultyClass = (difficulty) => {
    return `assignment-card__difficulty assignment-card__difficulty--${difficulty.toLowerCase()}`;
  };

  return (
    <div className="assignment-card" onClick={() => onClick(assignment._id)}>
      <div className="assignment-card__header">
        <h3 className="assignment-card__title">{assignment.title}</h3>
        <span className={getDifficultyClass(assignment.difficulty)}>
          {assignment.difficulty}
        </span>
      </div>
      <p className="assignment-card__description">{assignment.description}</p>
    </div>
  );
};

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        console.log('Fetching assignments from API...');
        const data = await fetchAssignments();
        console.log('Assignments loaded successfully:', data);
        setAssignments(data);
      } catch (err) {
        console.error('Error loading assignments:', err);
        setError('Failed to load assignments');
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, []);

  const handleAssignmentClick = (id) => {
    navigate(`/assignment/${id}`);
  };

  if (loading) {
    return (
      <div className="assignment-list">
        <h1 className="assignment-list__title">Loading assignments...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assignment-list">
        <h1 className="assignment-list__title">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="assignment-list">
      <h1 className="assignment-list__title">SQL Assignments</h1>
      <div className="assignment-list__grid">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
            onClick={handleAssignmentClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AssignmentList;