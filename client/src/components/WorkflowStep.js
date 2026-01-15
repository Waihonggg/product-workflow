import React, { useState } from 'react';
import './WorkflowStep.css';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: '#6c757d' },
  { value: 'in_progress', label: 'In Progress', color: '#ffc107' },
  { value: 'completed', label: 'Completed', color: '#28a745' },
  { value: 'blocked', label: 'Blocked', color: '#dc3545' }
];

function WorkflowStep({ step, stepNumber, onUpdate, productId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(step.notes || '');
  const [status, setStatus] = useState(step.status);
  const [isEditing, setIsEditing] = useState(false);

  const statusConfig = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    await onUpdate(step.id, newStatus, notes);
  };

  const handleSaveNotes = async () => {
    await onUpdate(step.id, status, notes);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setNotes(step.notes || '');
    setIsEditing(false);
  };

  return (
    <div className={`workflow-step ${status}`}>
      <div className="step-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="step-number">{stepNumber}</div>
        <div className="step-info">
          <h3>{step.step_name}</h3>
          {step.completed_at && (
            <span className="completed-date">
              Completed: {new Date(step.completed_at).toLocaleDateString()}
            </span>
          )}
        </div>
        <div className="step-status">
          <span
            className="status-badge"
            style={{ backgroundColor: statusConfig.color }}
          >
            {statusConfig.label}
          </span>
          <span className="expand-icon">{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="step-content">
          <div className="status-controls">
            <label>Status:</label>
            <div className="status-buttons">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`status-btn ${status === option.value ? 'active' : ''}`}
                  style={{
                    backgroundColor: status === option.value ? option.color : '#f0f0f0',
                    color: status === option.value ? 'white' : '#333'
                  }}
                  onClick={() => handleStatusChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="notes-section">
            <label>Notes:</label>
            {isEditing ? (
              <div className="notes-editor">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes for this step..."
                  rows="4"
                />
                <div className="notes-actions">
                  <button className="btn btn-success" onClick={handleSaveNotes}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="notes-display">
                <p>{notes || 'No notes added yet.'}</p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  {notes ? 'Edit Notes' : 'Add Notes'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkflowStep;
