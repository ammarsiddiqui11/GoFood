const express = require('express');
const cors = require('cors'); // Import the CORS package
const mongoDB = require('./db');
const app = express();
const port = 5000;

// Initialize the MongoDB connection
mongoDB();

// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization', // Add other headers if needed
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Define your routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));
// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
