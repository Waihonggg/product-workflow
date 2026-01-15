const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow all origins in development, specific in production
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

// Workflow steps definition
const WORKFLOW_STEPS = [
  { name: 'Product Naming', order: 1 },
  { name: 'Source Finding', order: 2 },
  { name: 'Formulation', order: 3 },
  { name: 'Pricing', order: 4 },
  { name: 'Certifications', order: 5 },
  { name: 'Deposit Payment', order: 6 },
  { name: 'Quality Testing', order: 7 },
  { name: 'Packaging Design', order: 8 },
  { name: 'Manufacturing', order: 9 },
  { name: 'Shipping Preparation', order: 10 },
  { name: 'Shipment Arrived', order: 11 }
];

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = db.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product with workflow steps
app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const steps = db.getStepsByProduct(req.params.id);
    const attachments = db.getAttachmentsByProduct(req.params.id);

    res.json({
      ...product,
      steps,
      attachments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new product
app.post('/api/products', (req, res) => {
  try {
    const { name, description, certifications, deposit_amount, deposit_currency } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const id = uuidv4();
    const now = new Date().toISOString();

    // Create product
    const product = db.createProduct({
      id,
      name,
      description: description || '',
      certifications: certifications || '',
      deposit_amount: deposit_amount || null,
      deposit_currency: deposit_currency || 'USD',
      created_at: now,
      updated_at: now
    });

    // Create workflow steps
    WORKFLOW_STEPS.forEach(step => {
      const stepId = uuidv4();
      db.createStep({
        id: stepId,
        product_id: id,
        step_name: step.name,
        step_order: step.order,
        status: 'pending',
        notes: '',
        completed_at: null,
        created_at: now,
        updated_at: now
      });
    });

    res.status(201).json({ 
      id, 
      name, 
      description,
      certifications: certifications || '',
      deposit_amount: deposit_amount || null,
      deposit_currency: deposit_currency || 'USD'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
app.put('/api/products/:id', (req, res) => {
  try {
    const { name, description, certifications, deposit_amount, deposit_currency } = req.body;
    const now = new Date().toISOString();

    const updated = db.updateProduct(req.params.id, {
      name,
      description: description || '',
      certifications: certifications || '',
      deposit_amount: deposit_amount || null,
      deposit_currency: deposit_currency || 'USD',
      updated_at: now
    });

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update workflow step status
app.put('/api/products/:productId/steps/:stepId', (req, res) => {
  try {
    const { status, notes } = req.body;
    const now = new Date().toISOString();
    const completedAt = status === 'completed' ? now : null;

    const updated = db.updateStep(req.params.stepId, req.params.productId, {
      status,
      notes: notes || '',
      completed_at: completedAt,
      updated_at: now
    });

    if (!updated) {
      return res.status(404).json({ error: 'Step not found' });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload attachment
app.post('/api/products/:productId/attachments', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const id = uuidv4();
    const { stepId } = req.body;
    const now = new Date().toISOString();

    const attachment = db.createAttachment({
      id,
      product_id: req.params.productId,
      step_id: stepId || null,
      filename: req.file.filename,
      original_filename: req.file.originalname,
      file_path: req.file.path,
      file_size: req.file.size,
      mime_type: req.file.mimetype,
      uploaded_at: now
    });

    res.status(201).json({
      id,
      filename: req.file.filename,
      original_filename: req.file.originalname,
      file_size: req.file.size,
      mime_type: req.file.mimetype
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get attachments for a product
app.get('/api/products/:productId/attachments', (req, res) => {
  try {
    const { stepId } = req.query;
    const attachments = db.getAttachmentsByProduct(req.params.productId, stepId || null);
    res.json(attachments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete attachment
app.delete('/api/attachments/:id', (req, res) => {
  try {
    const attachment = db.getAttachment(req.params.id);
    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }

    // Delete file from filesystem
    if (fs.existsSync(attachment.file_path)) {
      fs.unlinkSync(attachment.file_path);
    }

    // Delete from database
    db.deleteAttachment(req.params.id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    // Get all attachments
    const attachments = db.getAttachmentsByProduct(req.params.id);
    
    // Delete attachment files
    attachments.forEach(att => {
      if (fs.existsSync(att.file_path)) {
        fs.unlinkSync(att.file_path);
      }
    });

    // Delete from database
    db.deleteAttachmentsByProduct(req.params.id);
    db.deleteStepsByProduct(req.params.id);
    db.deleteProduct(req.params.id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get local IP address for network access
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const HOST = '0.0.0.0'; // Listen on all network interfaces
app.listen(PORT, HOST, () => {
  const localIP = getLocalIP();
  console.log(`Server running on port ${PORT}`);
  console.log(`Local access: http://localhost:${PORT}`);
  console.log(`Network access: http://${localIP}:${PORT}`);
  console.log(`\nYour colleagues can access the app at: http://${localIP}:3000`);
});
