# Product Development Workflow Management System

A complete full-stack application for managing product development workflows from initial concept through shipment arrival.

## 🚀 Quick Deploy (FREE!)

**Want to deploy to the cloud for free?** See:
- **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - 3-step deployment guide
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Detailed Render.com deployment

Deploy in 10 minutes and share with your team!

## Features

- **Complete Workflow Management**: Track products through 11 distinct stages:
  1. Product Naming
  2. Source Finding
  3. Formulation
  4. Pricing
  5. Certifications
  6. Deposit Payment
  7. Quality Testing
  8. Packaging Design
  9. Manufacturing
  10. Shipping Preparation
  11. Shipment Arrived

- **Certifications & Deposit Tracking**: 
  - Track required certifications for each product
  - Record deposit amounts and currency
  - Manage certification requirements throughout the workflow

- **Status Tracking**: Each step can be marked as:
  - Pending
  - In Progress
  - Completed
  - Blocked

- **Notes Management**: Add and edit notes for each workflow step

- **File Attachments**: Upload and manage attachments for products and specific workflow steps

- **Progress Tracking**: Visual progress bar showing overall completion percentage

- **Network Access**: Accessible on your local network - share with colleagues on the same WiFi/LAN

- **Modern UI**: Beautiful, responsive design with intuitive user experience

## Project Structure

```
product-development-workflow/
├── server/                 # Backend API
│   ├── index.js           # Express server and routes
│   ├── package.json        # Server dependencies
│   └── uploads/           # File upload directory (created automatically)
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # React entry point
│   ├── public/
│   └── package.json       # Client dependencies
├── package.json           # Root package.json with scripts
└── README.md              # This file
```

## Installation

1. **Install all dependencies** (from root directory):
   ```bash
   npm run install-all
   ```

   Or install manually:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

## Running the Application

### Development Mode (Recommended)

Run both server and client concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Run Separately

**Backend only:**
```bash
npm run server
# or
cd server && npm start
```

**Frontend only:**
```bash
npm run client
# or
cd client && npm start
```

## Usage

1. **Create a New Product**:
   - Click "New Product" button
   - Enter product name (required) and description (optional)
   - The system automatically creates all 9 workflow steps

2. **Manage Workflow Steps**:
   - Click on any step to expand it
   - Update status (Pending, In Progress, Completed, Blocked)
   - Add or edit notes for each step

3. **Upload Attachments**:
   - Go to the Attachments section
   - Select a specific step (optional) or leave as "General"
   - Click "Choose File" to upload documents, images, or other files
   - View or delete attachments as needed

4. **Track Progress**:
   - View overall progress percentage at the top of the product detail page
   - Progress bar updates automatically as steps are completed

## Technology Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **SQLite** (via better-sqlite3) - Lightweight database
- **Multer** - File upload handling
- **UUID** - Unique ID generation

### Frontend
- **React** - UI framework
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product with workflow steps and attachments
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PUT /api/products/:productId/steps/:stepId` - Update workflow step
- `POST /api/products/:productId/attachments` - Upload attachment
- `GET /api/products/:productId/attachments` - Get attachments
- `DELETE /api/attachments/:id` - Delete attachment

## Database Schema

- **products**: Stores product information
- **workflow_steps**: Stores workflow steps and their status
- **attachments**: Stores file attachment metadata

## File Storage

Uploaded files are stored in `server/uploads/` directory. Files are renamed with UUIDs to prevent conflicts.

## Network Access

To make the application accessible to colleagues on your local network:

1. **Create a `.env` file** in the `client` directory with:
   ```
   HOST=0.0.0.0
   DANGEROUSLY_DISABLE_HOST_CHECK=true
   ```

2. **Start the application** - the server will display your local IP address

3. **Share the IP address** with colleagues (e.g., `http://192.168.1.41:3000`)

4. **Firewall**: You may need to allow Node.js through Windows Firewall

See `NETWORK_ACCESS.md` for detailed instructions and troubleshooting.

## Notes

- The database file (`database.json`) is created automatically in the server directory
- File upload limit is set to 10MB per file
- All timestamps are stored in ISO format
- The application uses JSON file-based storage for simplicity - can be easily migrated to PostgreSQL or MySQL if needed
- Certifications and deposit information can be added when creating or editing products

## Future Enhancements

Potential improvements:
- User authentication and authorization
- Email notifications for status changes
- Export/import functionality
- Advanced filtering and search
- Comments/activity log
- Multiple product versions
- Team collaboration features
