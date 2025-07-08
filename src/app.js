import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN , // Allow all origins, adjust as needed
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json({limit: '50mb'})); // Increase the limit to 50mb
app.use(express.urlencoded({ extended: true, limit: '50mb' })); 
app.use(express.static("public") )// Increase
app.use(cookieParser()); 


// Import routes
import { userRoutes } from './routes/user.routes.js';

//Route Declaration
app.use('/api/v1/users', userRoutes);
// http://localhost:8000/api/v1/users/register
export default app;