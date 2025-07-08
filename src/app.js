// Importing required modules (libraries) for our app
import express from 'express'; // Express helps us create a web server easily
import cookieParser from 'cookie-parser'; // Helps us read cookies sent by the browser
import cors from 'cors'; // Allows our server to accept requests from other websites

// Create an Express application (our main server)
const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
// This allows our server to accept requests from different origins (websites)
// For example, if your frontend is running on a different port or domain
app.use(cors({
  origin: process.env.CORS_ORIGIN, // Only allow requests from this origin (set in environment variable)
  credentials: true, // Allow cookies and authentication information to be sent
}));

// These lines tell Express how to handle incoming data

// Parse incoming JSON data (like from a POST request body), up to 50 megabytes
app.use(express.json({limit: '50mb'}));

// Parse URL-encoded data (like from HTML forms), up to 50 megabytes
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files (like images, CSS, JS) from the "public" folder
app.use(express.static("public"));

// Parse cookies from incoming requests so we can use them in our code
app.use(cookieParser());

// Import user-related routes from another file
import { userRoutes } from './routes/user.routes.js';

// Use the imported user routes for any URL starting with /api/v1/users
// For example, /api/v1/users/register will be handled by userRoutes
app.use('/api/v1/users', userRoutes);

// Export the app so it can be used in another file (like to start the server)
export default app;