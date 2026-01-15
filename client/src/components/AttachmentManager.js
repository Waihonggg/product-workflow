import React, { useState } from 'react';
import api from '../api';
import API_URL from '../config';
import './AttachmentManager.css';

function AttachmentManager({ productId, steps, attachments, onUpdate }) {
  const [selectedStep, setSelectedStep] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    if (selectedStep) {
      formData.append('stepId', selectedStep);
    }

    try {
      await api.post(`/api/products/${productId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await onUpdate(productId);
      setSelectedStep('');
      e.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
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
      await onUpdate(productId);
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

  const getStepName = (stepId) => {
    if (!stepId) return 'General';
    const step = steps.find(s => s.id === stepId);
    return step ? step.step_name : 'Unknown';
  };

  const groupedAttachments = attachments.reduce((acc, att) => {
    const key = att.step_id || 'general';
    if (!acc[key]) acc[key] = [];
    acc[key].push(att);
    return acc;
  }, {});

  return (
    <div className="attachment-manager">
      <div className="upload-section">
        <h3>Upload New Attachment</h3>
        <div className="upload-controls">
          <select
            value={selectedStep}
            onChange={(e) => setSelectedStep(e.target.value)}
            className="step-select"
          >
            <option value="">General (All Steps)</option>
            {steps.map(step => (
              <option key={step.id} value={step.id}>
                {step.step_name}
              </option>
            ))}
          </select>
          <label className="file-upload-btn">
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ display: 'none' }}
            />
            {uploading ? 'Uploading...' : 'Choose File'}
          </label>
        </div>
      </div>

      {attachments.length === 0 ? (
        <div className="no-attachments">
          <p>No attachments yet. Upload files to attach them to this product.</p>
        </div>
      ) : (
        <div className="attachments-list">
          {Object.keys(groupedAttachments).map(key => (
            <div key={key} className="attachment-group">
              <h4 className="group-title">
                {key === 'general' ? 'General Attachments' : getStepName(key)}
              </h4>
              <div className="attachments-grid">
                {groupedAttachments[key].map(att => (
                  <div key={att.id} className="attachment-item">
                    <div className="attachment-info">
                      <div className="attachment-icon">📎</div>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AttachmentManager;
