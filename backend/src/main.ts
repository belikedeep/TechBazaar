import express from 'express';
import 'dotenv/config'
import dotenv from 'dotenv'
import { connectDB } from './db/dbConnect';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import { registerRoutes } from "./routes";

await connectDB();

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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});

export default app;