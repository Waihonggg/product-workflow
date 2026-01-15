import React, { useState, useEffect } from 'react';
import api from './api';
import './App.css';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CreateProductModal from './components/CreateProductModal';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      await api.post('/api/products', productData);
      await fetchProducts();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  const handleSelectProduct = async (productId) => {
    try {
      const response = await api.get(`/api/products/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/api/products/${productId}`);
        await fetchProducts();
        if (selectedProduct && selectedProduct.id === productId) {
          setSelectedProduct(null);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {selectedProduct ? (
        <ProductDetail
          product={selectedProduct}
          onBack={handleBackToList}
          onUpdate={handleSelectProduct}
        />
      ) : (
        <>
          <header className="app-header">
            <h1>Product Development Workflow</h1>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              + New Product
            </button>
          </header>
          <ProductList
            products={products}
            onSelectProduct={handleSelectProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </>
      )}
      {showCreateModal && (
        <CreateProductModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateProduct}
        />
      )}
    </div>
  );
}

export default App;
