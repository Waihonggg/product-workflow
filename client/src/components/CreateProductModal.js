import React, { useState } from 'react';
import './CreateProductModal.css';

function CreateProductModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    certifications: '',
    deposit_amount: '',
    deposit_currency: 'USD'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }

    setLoading(true);
    try {
      await onCreate(formData);
      setFormData({ 
        name: '', 
        description: '',
        certifications: '',
        deposit_amount: '',
        deposit_currency: 'USD'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Product</h2>
          <button className="btn-icon" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description (optional)"
              rows="4"
            />
          </div>
          <div className="form-group">
            <label htmlFor="certifications">Certifications</label>
            <textarea
              id="certifications"
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              placeholder="Enter required certifications (e.g., ISO 9001, FDA, CE Mark, etc.)"
              rows="3"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="deposit_amount">Deposit Amount</label>
              <input
                type="number"
                id="deposit_amount"
                value={formData.deposit_amount}
                onChange={(e) => setFormData({ ...formData, deposit_amount: e.target.value })}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label htmlFor="deposit_currency">Currency</label>
              <select
                id="deposit_currency"
                value={formData.deposit_currency}
                onChange={(e) => setFormData({ ...formData, deposit_currency: e.target.value })}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CNY">CNY</option>
                <option value="JPY">JPY</option>
                <option value="SGD">SGD</option>
                <option value="MYR">MYR</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductModal;
