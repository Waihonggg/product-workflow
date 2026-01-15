import React, { useState, useEffect } from 'react';
import api from '../api';
import './ProductDetail.css';
import WorkflowStep from './WorkflowStep';
import AttachmentManager from './AttachmentManager';

function ProductDetail({ product, onBack, onUpdate }) {
  const [productData, setProductData] = useState(product);
  const [editingName, setEditingName] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(product.description || '');
  const [productCertifications, setProductCertifications] = useState(product.certifications || '');
  const [productDepositAmount, setProductDepositAmount] = useState(product.deposit_amount || '');
  const [productDepositCurrency, setProductDepositCurrency] = useState(product.deposit_currency || 'USD');

  useEffect(() => {
    setProductData(product);
    setProductName(product.name);
    setProductDescription(product.description || '');
    setProductCertifications(product.certifications || '');
    setProductDepositAmount(product.deposit_amount || '');
    setProductDepositCurrency(product.deposit_currency || 'USD');
  }, [product]);

  const handleStepUpdate = async (stepId, status, notes) => {
    try {
      await api.put(`/api/products/${product.id}/steps/${stepId}`, {
        status,
        notes
      });
      const response = await api.get(`/api/products/${product.id}`);
      setProductData(response.data);
      onUpdate(product.id);
    } catch (error) {
      console.error('Error updating step:', error);
      alert('Failed to update step');
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await api.put(`/api/products/${product.id}`, {
        name: productName,
        description: productDescription,
        certifications: productCertifications,
        deposit_amount: productDepositAmount ? parseFloat(productDepositAmount) : null,
        deposit_currency: productDepositCurrency
      });
      setEditingName(false);
      const response = await api.get(`/api/products/${product.id}`);
      setProductData(response.data);
      onUpdate(product.id);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const getOverallProgress = () => {
    if (!productData.steps) return 0;
    const completed = productData.steps.filter(s => s.status === 'completed').length;
    return Math.round((completed / productData.steps.length) * 100);
  };

  return (
    <div className="product-detail">
      <div className="detail-header">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Back to List
        </button>
        <div className="header-actions">
          {editingName ? (
            <div className="edit-form">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="edit-input"
              />
              <button className="btn btn-success" onClick={handleUpdateProduct}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={() => {
                setEditingName(false);
                setProductName(product.name);
                setProductDescription(product.description || '');
                setProductCertifications(product.certifications || '');
                setProductDepositAmount(product.deposit_amount || '');
                setProductDepositCurrency(product.deposit_currency || 'USD');
              }}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary" onClick={() => setEditingName(true)}>
              Edit Product
            </button>
          )}
        </div>
      </div>

      <div className="detail-content">
        <div className="product-info-card">
          <h1>{productData.name}</h1>
          {productData.description && (
            <p className="product-desc">{productData.description}</p>
          )}
          
          {(productData.certifications || productData.deposit_amount) && (
            <div className="product-details-grid">
              {productData.certifications && (
                <div className="detail-item">
                  <span className="detail-label">Certifications:</span>
                  <span className="detail-value">{productData.certifications}</span>
                </div>
              )}
              {productData.deposit_amount && (
                <div className="detail-item">
                  <span className="detail-label">Deposit:</span>
                  <span className="detail-value">
                    {productData.deposit_currency || 'USD'} {parseFloat(productData.deposit_amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
            </div>
          )}

          {editingName && (
            <div className="edit-section">
              <div className="form-group">
                <label>Certifications:</label>
                <textarea
                  value={productCertifications}
                  onChange={(e) => setProductCertifications(e.target.value)}
                  placeholder="Enter required certifications"
                  rows="2"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Deposit Amount:</label>
                  <input
                    type="number"
                    value={productDepositAmount}
                    onChange={(e) => setProductDepositAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Currency:</label>
                  <select
                    value={productDepositCurrency}
                    onChange={(e) => setProductDepositCurrency(e.target.value)}
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
            </div>
          )}

          <div className="progress-section">
            <div className="progress-label">
              <span>Overall Progress</span>
              <span className="progress-percentage">{getOverallProgress()}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${getOverallProgress()}%` }}
              />
            </div>
          </div>
        </div>

        <div className="workflow-section">
          <h2>Development Workflow</h2>
          <div className="workflow-steps">
            {productData.steps && productData.steps.map((step, index) => (
              <WorkflowStep
                key={step.id}
                step={step}
                stepNumber={index + 1}
                onUpdate={handleStepUpdate}
                productId={product.id}
              />
            ))}
          </div>
        </div>

        <div className="attachments-section">
          <h2>Attachments</h2>
          <AttachmentManager
            productId={product.id}
            steps={productData.steps || []}
            attachments={productData.attachments || []}
            onUpdate={onUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
