import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { connectDB } from './db/dbConnect.js';
import { registerRoutes } from './routes/index.js';

const app = express();
const PORT = process.env.PORT;

// Middleware
const ORIGIN_URL = process.env.ORIGIN_URL;
if (!ORIGIN_URL) {
  throw new Error("ORIGIN_URL environment variable is not set");
}
app.use(cors({
  origin: ORIGIN_URL, // Frontend URL from env
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists and serve uploaded files statically
const uploadsDir = path.join(process.cwd(), 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created uploads directory at ${uploadsDir}`);
  }
} catch (err) {
  console.warn('Could not create uploads directory:', err);
}
// Expose uploaded files at /uploads/<filename>
app.use('/uploads', express.static(uploadsDir));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World! Backend is running with TypeScript and ES6 modules',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OKAY',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Register all routes
registerRoutes(app);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Async function to start the server
async function startServer() {
  try {
    // Connect to database first
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT} :)`);
      console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default app;