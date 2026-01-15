import React from 'react';
import './ProductList.css';

function ProductList({ products, onSelectProduct, onDeleteProduct }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h2>No products yet</h2>
        <p>Create your first product to get started!</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-header">
              <h3>{product.name}</h3>
              <button
                className="btn-icon btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteProduct(product.id);
                }}
                title="Delete product"
              >
                ×
              </button>
            </div>
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
            <div className="product-meta">
              <span className="product-date">
                Created: {new Date(product.created_at).toLocaleDateString()}
              </span>
            </div>
            <button
              className="btn btn-primary btn-full"
              onClick={() => onSelectProduct(product.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
