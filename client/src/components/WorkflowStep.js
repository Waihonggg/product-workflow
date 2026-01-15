import React, { useState } from 'react';
import api from '../api';
import API_URL from '../config';
import './WorkflowStep.css';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: '#6c757d' },
  { value: 'in_progress', label: 'In Progress', color: '#ffc107' },
  { value: 'completed', label: 'Completed', color: '#28a745' },
  { value: 'blocked', label: 'Blocked', color: '#dc3545' }
];

function WorkflowStep({ step, stepNumber, onUpdate, productId, attachments = [], onAttachmentsUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(step.notes || '');
  const [status, setStatus] = useState(step.status);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const statusConfig = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
  
  // Get attachments for this step
  const stepAttachments = attachments.filter(att => att.step_id === step.id);

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

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('stepId', step.id);

    try {
      await api.post(`/api/products/${productId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await onAttachmentsUpdate(productId);
      e.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (attachmentId) => {
    if (!window.confirm('Are you sure you want to delete this attachment?')) {
      return;
    }

    setDeleting(attachmentId);
    try {
      await api.delete(`/api/attachments/${attachmentId}`);
      await onAttachmentsUpdate(productId);
    } catch (error) {
      console.error('Error deleting attachment:', error);
      alert('Failed to delete attachment');
    } finally {
      setDeleting(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType) => {
    if (mimeType?.includes('image')) return '🖼️';
    if (mimeType?.includes('pdf')) return '📄';
    if (mimeType?.includes('word') || mimeType?.includes('document')) return '📝';
    if (mimeType?.includes('excel') || mimeType?.includes('spreadsheet')) return '📊';
    if (mimeType?.includes('zip') || mimeType?.includes('archive')) return '📦';
    return '📎';
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
          {stepAttachments.length > 0 && (
            <span className="attachment-indicator" title={`${stepAttachments.length} file(s) attached`}>
              📎 {stepAttachments.length}
            </span>
          )}
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

          <div className="step-attachments-section">
            <label>Attachments:</label>
            <div className="attachments-upload">
              <label className="file-upload-btn">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
                {uploading ? 'Uploading...' : '📤 Upload Files'}
              </label>
              <span className="upload-hint">You can select multiple files</span>
            </div>

            {stepAttachments.length === 0 ? (
              <div className="no-attachments">
                <p>No attachments yet. Click "Upload Files" to add documents.</p>
              </div>
            ) : (
              <div className="attachments-list">
                {stepAttachments.map(att => (
                  <div key={att.id} className="attachment-item">
                    <div className="attachment-info">
                      <div className="attachment-icon">{getFileIcon(att.mime_type)}</div>
                      <div className="attachment-details">
                        <div className="attachment-name" title={att.original_filename}>
                          {att.original_filename}
                        </div>
                        <div className="attachment-meta">
                          {formatFileSize(att.file_size)} • {new Date(att.uploaded_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="attachment-actions">
                      <a
                        href={`${API_URL}/uploads/${att.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        View
                      </a>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(att.id)}
                        disabled={deleting === att.id}
                      >
                        {deleting === att.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkflowStep;
