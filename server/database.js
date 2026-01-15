const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database file if it doesn't exist
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      products: [],
      workflow_steps: [],
      attachments: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read database
function readDB() {
  initDB();
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

// Write database
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Database operations
const db = {
  // Products
  getProducts() {
    const data = readDB();
    return data.products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  getProduct(id) {
    const data = readDB();
    return data.products.find(p => p.id === id);
  },

  createProduct(product) {
    const data = readDB();
    data.products.push(product);
    writeDB(data);
    return product;
  },

  updateProduct(id, updates) {
    const data = readDB();
    const index = data.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    data.products[index] = { ...data.products[index], ...updates };
    writeDB(data);
    return data.products[index];
  },

  deleteProduct(id) {
    const data = readDB();
    data.products = data.products.filter(p => p.id !== id);
    writeDB(data);
  },

  // Workflow Steps
  getStepsByProduct(productId) {
    const data = readDB();
    return data.workflow_steps
      .filter(s => s.product_id === productId)
      .sort((a, b) => a.step_order - b.step_order);
  },

  createStep(step) {
    const data = readDB();
    data.workflow_steps.push(step);
    writeDB(data);
    return step;
  },

  updateStep(stepId, productId, updates) {
    const data = readDB();
    const index = data.workflow_steps.findIndex(
      s => s.id === stepId && s.product_id === productId
    );
    if (index === -1) return null;
    data.workflow_steps[index] = { ...data.workflow_steps[index], ...updates };
    writeDB(data);
    return data.workflow_steps[index];
  },

  deleteStepsByProduct(productId) {
    const data = readDB();
    data.workflow_steps = data.workflow_steps.filter(s => s.product_id !== productId);
    writeDB(data);
  },

  // Attachments
  getAttachmentsByProduct(productId, stepId = null) {
    const data = readDB();
    let attachments = data.attachments.filter(a => a.product_id === productId);
    if (stepId) {
      attachments = attachments.filter(a => a.step_id === stepId);
    }
    return attachments.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
  },

  createAttachment(attachment) {
    const data = readDB();
    data.attachments.push(attachment);
    writeDB(data);
    return attachment;
  },

  getAttachment(id) {
    const data = readDB();
    return data.attachments.find(a => a.id === id);
  },

  deleteAttachment(id) {
    const data = readDB();
    data.attachments = data.attachments.filter(a => a.id !== id);
    writeDB(data);
  },

  deleteAttachmentsByProduct(productId) {
    const data = readDB();
    data.attachments = data.attachments.filter(a => a.product_id !== productId);
    writeDB(data);
  }
};

module.exports = db;
