import express from 'express';
import 'dotenv/config'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import User from './models/User';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config()

mongoose.connect(process.env.MONGO_URI as string).
  then(() => { console.log("MongoDB Connected") })
  .catch(err => console.log("MongoDb Connection issue"))

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

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const newUser = new User({ name, email, password })
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Server Error'
    });
  }
})

app.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});

export default app;